import { z } from "zod";

import { allBanks, getQuestion, getQuestionBank } from "../src/data/questions";
import { ROADMAP_SKILLS } from "../src/data/roadmap";

const questionSchema = z.object({
  id: z.string().min(1),
  topicId: z.string().min(1),
  set: z.number().int().min(1).max(3),
  environment: z.enum(["node", "browser"]),
  html: z.string().optional(),
  code: z.string().min(1),
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
