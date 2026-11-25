import { Router } from "express";
import type { Response } from "express";
import { z } from "zod";

import { getQuestion, getQuestionBank } from "../data/questions";
import type { Question } from "../data/questions/types";
import { TestAttempt } from "../models/TestAttempt";
import type { ITestAttempt } from "../models/TestAttempt";
import { protect, AuthRequest } from "../middleware/protect";
import { callAi } from "../services/ai/callAi";
import { isAiFailure, statusForAiFailure } from "../services/ai/errors";
import { loadProgress, saveProgress } from "../services/roadmap/progressStore";
import { buildView, LEVEL_RULES, recordAttempt, RuleError } from "../services/roadmap/rules";
import type { LevelNumber } from "../services/roadmap/rules";
import { allComplete, applyAnswer, buildAttemptView, pickQuestions, shuffle } from "../services/tests/attempt";
import type { AttemptData } from "../services/tests/attempt";
import { activeTimeMs, scoreQuestion, toQuestionPoints } from "../services/tests/grading";
import { buildPartCPrompt, coveredCounts, partCItems, partCMarkSchema } from "../services/tests/partC";

const router = Router();

router.use(protect);

// a broken rule becomes its own answer; anything else is a real error
function sendRuleError(error: unknown, res: Response, extra: object = {}): void {
  if (error instanceof RuleError) {
    res.status(error.status).json({ message: error.message, ...extra });
    return;
  }
  throw error;
}

// the saved attempt as plain data, and its questions in the order of the attempt
function toData(saved: ITestAttempt): AttemptData {
  return {
    skillId: saved.skillId,
    level: saved.level as LevelNumber,
    attemptNumber: saved.attemptNumber,
    set: saved.set,
    questionIds: [...saved.questionIds],
    optionOrders: saved.optionOrders.map((order) => [...order]),
    answers: saved.answers.map((item) => ({
      questionId: item.questionId,
      partA: item.partA,
      partB: item.partB,
      partC: item.partC,
      partAAt: item.partAAt,
      partBAt: item.partBAt,
      partCAt: item.partCAt,
    })),
    startedAt: saved.startedAt,
    finishedAt: saved.finishedAt,
  };
}

function questionsOf(saved: ITestAttempt): Question[] | null {
  const questions = saved.questionIds.map((id) => getQuestion(saved.skillId, saved.level, id));
  return questions.every((question): question is Question => question !== undefined) ? questions : null;
}

const startSchema = z.object({
  skillId: z.string().min(1).max(60),
  level: z.number().int().min(1).max(3),
});

// Start the test of a level, or continue the one he left unfinished.
router.post("/start", async (req: AuthRequest, res) => {
  const parsed = startSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }
  const { skillId, level } = parsed.data;

  const bank = getQuestionBank(skillId, level);
  if (!bank) {
    res.status(404).json({ message: "There are no questions for this level yet" });
    return;
  }

  // an unfinished test is continued, never started again
  const unfinished = await TestAttempt.findOne({ userId: req.userId, skillId, level, status: "in_progress" });
  if (unfinished) {
    const questions = questionsOf(unfinished);
    if (questions) {
      res.json(buildAttemptView(toData(unfinished), questions, String(unfinished._id)));
      return;
    }
    // its questions no longer exist (the data was changed): it is dropped and a new test starts
    await unfinished.deleteOne();
  }

  const view = buildView(await loadProgress(req.userId));
  const levelView = view.skills.find((skill) => skill.id === skillId)?.levels[level - 1];
  if (!levelView) {
    res.status(404).json({ message: "Skill not found" });
    return;
  }
  if (!levelView.canTake) {
    // the page says why: locked (with the reason), waiting (with the time) or already passed
    const message =
      levelView.state === "passed"
        ? "This level is already passed"
        : levelView.state === "waiting"
          ? "The next attempt is not open yet"
          : levelView.reason || "This level is not open yet";
    res.status(409).json({ message, state: levelView.state, nextAttemptAt: levelView.nextAttemptAt });
    return;
  }

  const attemptNumber = levelView.attempts + 1;
  const picked = pickQuestions(bank, attemptNumber);
  const optionOrders = picked.questions.map(() => shuffle([0, 1, 2, 3]));

  const created = await TestAttempt.create({
    userId: req.userId,
    skillId,
    level,
    attemptNumber,
    set: picked.set,
    questionIds: picked.questions.map((question) => question.id),
    optionOrders,
    answers: [],
  });

  res.status(201).json(buildAttemptView(toData(created), picked.questions, String(created._id)));
});

const answerSchema = z
  .object({
    partA: z.string().max(400).optional(),
    partB: z.number().int().optional(), // the position of the chosen option on the screen
    partC: z.string().max(800).optional(),
  })
  .refine((body) => body.partA !== undefined || body.partB !== undefined || body.partC !== undefined);

// Save one answer (a part of one question). The rules are in services/tests/attempt.ts.
router.patch("/:id/answers/:questionId", async (req: AuthRequest, res) => {
  const parsed = answerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const saved = await TestAttempt.findOne({ _id: String(req.params.id), userId: req.userId }).catch(() => null);
  const questions = saved ? questionsOf(saved) : null;
  if (!saved || !questions) {
    res.status(404).json({ message: "Test not found" });
    return;
  }

  try {
    const data = toData(saved);
    const answers = applyAnswer(data, questions, String(req.params.questionId), parsed.data);
    saved.answers = answers as typeof saved.answers;
    await saved.save();
    res.json(buildAttemptView({ ...data, answers }, questions, String(saved._id)));
  } catch (error) {
    sendRuleError(error, res);
  }
});

// Finish the test: grade it, mark Part C with one AI call, and record the result in his roadmap.
router.post("/:id/finish", async (req: AuthRequest, res) => {
  const saved = await TestAttempt.findOne({ _id: String(req.params.id), userId: req.userId }).catch(() => null);
  const questions = saved ? questionsOf(saved) : null;
  if (!saved || !questions) {
    res.status(404).json({ message: "Test not found" });
    return;
  }

  const rule = LEVEL_RULES[saved.level - 1];
  const resultBody = async (stored: NonNullable<ITestAttempt["result"]>) => {
    const progress = await loadProgress(req.userId);
    const levels = buildView(progress).skills.find((skill) => skill.id === saved.skillId)?.levels ?? [];
    const next = levels[saved.level]; // the next level, if there is one
    return {
      passed: stored.passed,
      points: stored.points,
      total: stored.total,
      needed: stored.needed,
      scorePercent: stored.scorePercent,
      timeMs: stored.timeMs,
      activeMs: stored.activeMs,
      waitHours: stored.passed ? null : rule.waitHours,
      nextAttemptAt: stored.passed ? null : (levels[saved.level - 1]?.nextAttemptAt ?? null),
      nextLevelOpen: stored.passed && next !== undefined && next.state === "open",
    };
  };

  // finishing twice answers with the same result
  if (saved.status === "finished" && saved.result) {
    res.json(await resultBody(saved.result));
    return;
  }

  const data = toData(saved);
  if (!allComplete(questions, data.answers)) {
    res.status(409).json({ message: "Answer every question before you finish" });
    return;
  }

  try {
    // Part C: one AI call for all the typed explanations; if it fails, nothing is finished and he can try again
    const items = partCItems(questions, data.answers);
    const covered = new Map<string, number[]>();
    if (items.length > 0) {
      const prompt = buildPartCPrompt(items);
      const marked = await callAi({
        userId: String(req.userId),
        task: "answerFeedback",
        system: prompt.system,
        user: prompt.user,
        schema: partCMarkSchema,
        maxTokens: 800,
      });
      for (const [id, numbers] of coveredCounts(marked.data, items)) covered.set(id, numbers);
    }

    let sixths = 0;
    for (const question of questions) {
      const answer = data.answers.find((item) => item.questionId === question.id) ?? { questionId: question.id };
      sixths += scoreQuestion(question, answer, covered.get(question.id)?.length ?? 0).total;
    }
    const points = toQuestionPoints(sixths);

    const progress = await loadProgress(req.userId);
    const recorded = recordAttempt(progress, saved.skillId, saved.level as LevelNumber, points);
    await saveProgress(req.userId, progress);

    const finishedAt = new Date();
    const times = [
      data.startedAt,
      finishedAt,
      ...data.answers.flatMap((item) => [item.partAAt, item.partBAt, item.partCAt].filter((time): time is Date => !!time)),
    ];

    saved.status = "finished";
    saved.finishedAt = finishedAt;
    saved.result = {
      points: Math.round(points * 100) / 100,
      total: questions.length,
      needed: rule.needed,
      passed: recorded.passed,
      scorePercent: recorded.scorePercent,
      timeMs: finishedAt.getTime() - data.startedAt.getTime(),
      activeMs: activeTimeMs(times),
      partCCovered: [...covered].map(([questionId, numbers]) => ({ questionId, covered: numbers })),
    };
    await saved.save();

    res.json(await resultBody(saved.result));
  } catch (error) {
    if (isAiFailure(error)) {
      res.status(statusForAiFailure(error)).json({ kind: error.kind, message: error.message });
      return;
    }
    sendRuleError(error, res);
  }
});

export default router;

/**
 * POST /start begins the test of a level, or returns the unfinished one (so he continues after a break). Only the
 *  questions he has reached are sent, and never the correct answers.
 * PATCH /:id/answers/:questionId saves one part of one answer; services/tests/attempt.ts decides what is allowed
 *  (Part A locks when saved, Part B needs Part A, Part C needs Part B, a question needs the ones before it).
 * POST /:id/finish grades the test (Parts A and B by code, Part C by one AI call), records the result in the roadmap
 *  (which decides passing, the wait and the next level) and stores the time taken.
 */
