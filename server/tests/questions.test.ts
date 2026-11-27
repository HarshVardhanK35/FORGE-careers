import { z } from "zod";

import { allBanks, getQuestion, getQuestionBank } from "../src/data/questions";
import { ROADMAP_SKILLS } from "../src/data/roadmap";
import { buildAttemptView } from "../src/services/tests/attempt";

const questionSchema = z.object({
  id: z.string().min(1),
  topicId: z.string().min(1),
  set: z.number().int().min(1).max(3),
  environment: z.enum(["node", "browser", "page", "react"]),
  html: z.string().optional(),
  code: z.string().min(1),
  check: z.string().optional(),
  partA: z.object({ ask: z.string().min(1), accepted: z.array(z.string()).min(1) }),
  partB: z.object({
    ask: z.string().min(1),
    options: z.array(z.string().min(5)).length(4),
    correct: z.number().int().min(0).max(3),
  }),
  partC: z
    .object({
      ask: z.string().min(1),
      keyPoints: z.array(z.string().min(5)).min(3).max(4),
      modelAnswer: z.string().min(20),
    })
    .optional(),
});

const topicIds = ROADMAP_SKILLS.flatMap((skill) => skill.topics.map((topic) => topic.id));

describe("question banks", () => {
  it("has the three sets of 21 questions of JavaScript level 1", () => {
    const bank = getQuestionBank("javascript", 1);
    expect(bank?.questions).toHaveLength(63);
    for (const set of [1, 2, 3]) expect(bank?.questions.filter((question) => question.set === set)).toHaveLength(21);
  });

  it("has the three sets of 21 questions of HTML+CSS level 1, with 3 Part C questions in each", () => {
    const bank = getQuestionBank("css", 1);
    expect(bank?.questions).toHaveLength(63);
    for (const set of [1, 2, 3]) {
      const inSet = bank?.questions.filter((question) => question.set === set) ?? [];
      expect(inSet).toHaveLength(21);
      expect(inSet.filter((question) => question.partC)).toHaveLength(3);
    }
  });

  it("has the three sets of 21 questions of React level 1, with 3 Part C questions in each", () => {
    const bank = getQuestionBank("react", 1);
    expect(bank?.questions).toHaveLength(63);
    for (const set of [1, 2, 3]) {
      const inSet = bank?.questions.filter((question) => question.set === set) ?? [];
      expect(inSet).toHaveLength(21);
      expect(inSet.filter((question) => question.partC)).toHaveLength(3);
    }
  });

  it("gives every question a valid shape", () => {
    for (const bank of allBanks()) {
      for (const question of bank.questions) {
        const result = questionSchema.safeParse(question);
        if (!result.success) throw new Error(`${question.id}: ${result.error.message}`);
      }
    }
  });

  it("has unique ids that name their topic, level and set", () => {
    for (const bank of allBanks()) {
      const ids = bank.questions.map((question) => question.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const question of bank.questions) {
        expect(question.id.startsWith(`${question.topicId}-l${bank.level}-s${question.set}-q`)).toBe(true);
        expect(topicIds).toContain(question.topicId);
      }
    }
  });

  it("has the Part C questions agreed for each set (3 per set)", () => {
    const bank = getQuestionBank("javascript", 1);
    for (const set of [1, 2, 3]) {
      expect(bank?.questions.filter((question) => question.set === set && question.partC)).toHaveLength(3);
    }
  });

  it("gives a browser question the page it runs on", () => {
    for (const bank of allBanks()) {
      for (const question of bank.questions) {
        if (question.environment === "browser") expect(question.html).toBeTruthy();
      }
    }
  });

  it("gives every page and React question a check and keeps it off the screen", () => {
    const questions = [...(getQuestionBank("css", 1)?.questions ?? []), ...(getQuestionBank("react", 1)?.questions ?? [])];
    expect(questions).toHaveLength(126);
    for (const question of questions) {
      expect(["page", "react"]).toContain(question.environment);
      expect(question.check).toBeTruthy();
      const view = buildAttemptView(
        { skillId: "css", level: 1, attemptNumber: 1, set: 1, questionIds: [question.id], optionOrders: [[0, 1, 2, 3]], answers: [], startedAt: new Date() },
        [question]
      );
      expect(JSON.stringify(view)).not.toContain(question.check as string);
    }
  });

  it("has options that are all different", () => {
    for (const bank of allBanks()) {
      for (const question of bank.questions) expect(new Set(question.partB.options).size).toBe(4);
    }
  });

  it("finds a question by id", () => {
    expect(getQuestion("javascript", 1, "js-closures-l1-s1-q14")?.topicId).toBe("js-closures");
    expect(getQuestion("javascript", 1, "nope")).toBeUndefined();
    expect(getQuestionBank("javascript", 2)).toBeUndefined();
  });
});
