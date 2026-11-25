import { Router } from "express";
import type { Response } from "express";
import { z } from "zod";

import { getNotes } from "../data/content";
import { RoadmapProgress } from "../models/RoadmapProgress";
import { protect, AuthRequest } from "../middleware/protect";
import { buildView, emptyProgress, recordAttempt, RESOURCE_MAX, RuleError, unlockSkill, updateTopic } from "../services/roadmap/rules";
import type { LevelNumber, ProgressData } from "../services/roadmap/rules";

const router = Router();

router.use(protect);

// his progress as plain data (an empty one when he has not started)
async function loadProgress(userId: string | undefined): Promise<ProgressData> {
  const saved = await RoadmapProgress.findOne({ userId });
  if (!saved) return emptyProgress();

  return {
    doneTopics: [...saved.doneTopics],
    resources: saved.resources.map(({ topicId, text }) => ({ topicId, text })),
    levels: saved.levels.map((item) => ({
      skillId: item.skillId,
      level: item.level,
      status: item.status,
      attempts: item.attempts,
      bestScore: item.bestScore,
      nextAttemptAt: item.nextAttemptAt,
    })),
    manualUnlocks: [...saved.manualUnlocks],
    studiedFlows: [...saved.studiedFlows],
  };
}

async function saveProgress(userId: string | undefined, progress: ProgressData): Promise<void> {
  await RoadmapProgress.findOneAndUpdate({ userId }, { $set: progress }, { upsert: true, setDefaultsOnInsert: true });
}

// a broken rule becomes its own answer; anything else is a real error
function sendRuleError(error: unknown, res: Response): void {
  if (error instanceof RuleError) {
    res.status(error.status).json({ message: error.message });
    return;
  }
  throw error;
}

router.get("/", async (req: AuthRequest, res) => {
  res.json(buildView(await loadProgress(req.userId)));
});

// the learning notes of one topic (the Learn button on the Skills page)
router.get("/topics/:topicId/learn", (req: AuthRequest, res) => {
  const notes = getNotes(String(req.params.topicId));
  if (!notes) {
    res.status(404).json({ message: "There are no notes for this topic yet" });
    return;
  }
  res.json(notes);
});

const topicPatchSchema = z
  .object({
    done: z.boolean().optional(),
    resource: z.string().max(RESOURCE_MAX + 100).optional(),
  })
  .refine((body) => body.done !== undefined || body.resource !== undefined);

// tick or untick a topic, and set or clear its resource
router.patch("/topics/:topicId", async (req: AuthRequest, res) => {
  const parsed = topicPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  try {
    const progress = await loadProgress(req.userId);
    updateTopic(progress, String(req.params.topicId), parsed.data);
    await saveProgress(req.userId, progress);
    res.json(buildView(progress));
  } catch (error) {
    sendRuleError(error, res);
  }
});

// "Unlock anyway": the earlier unpassed levels are marked skipped and the skill opens
router.post("/skills/:skillId/unlock", async (req: AuthRequest, res) => {
  try {
    const progress = await loadProgress(req.userId);
    unlockSkill(progress, String(req.params.skillId));
    await saveProgress(req.userId, progress);
    res.json(buildView(progress));
  } catch (error) {
    sendRuleError(error, res);
  }
});

const attemptSchema = z.object({ correct: z.number().int().min(0) });

// Record one test attempt (how many answers were correct). The test screen will call this later;
// until then it lets the rules be tried in Postman.
router.post("/skills/:skillId/levels/:level/attempts", async (req: AuthRequest, res) => {
  const level = Number(req.params.level);
  const parsed = attemptSchema.safeParse(req.body);
  if (!parsed.success || ![1, 2, 3].includes(level)) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  try {
    const progress = await loadProgress(req.userId);
    const result = recordAttempt(progress, String(req.params.skillId), level as LevelNumber, parsed.data.correct);
    await saveProgress(req.userId, progress);
    res.json({ ...result, roadmap: buildView(progress) });
  } catch (error) {
    sendRuleError(error, res);
  }
});

export default router;

/**
 * GET / answers with the whole roadmap, already worked out: which skill is open, which level is locked, waiting,
 *  passed or skipped, and when the next attempt opens. The client only draws it.
 *
 * GET /topics/:topicId/learn answers with the notes of one topic (data/content), or 404 when there are none yet.
 *
 * Every change loads his progress as plain data, applies one rule from services/roadmap/rules.ts, saves it
 *  and answers with the new roadmap. A broken rule (a locked skill, a level not open) answers 409 with a sentence.
 */
