import { getQuestionBank } from "../src/data/questions";
import type { Question } from "../src/data/questions/types";
import { RuleError } from "../src/services/roadmap/rules";
import {
  allComplete,
  applyAnswer,
  buildAttemptView,
  isComplete,
  pickQuestions,
  reachedCount,
  shuffle,
} from "../src/services/tests/attempt";
import type { AttemptData } from "../src/services/tests/attempt";
import { coveredCounts, partCItems } from "../src/services/tests/partC";

const bank = getQuestionBank("javascript", 1)!;
const NOW = new Date("2026-11-25T10:00:00Z");

// a fixed "random" so the tests give the same answer every time
const steady = () => 0.5;

function newAttempt(set = 1): { attempt: AttemptData; questions: Question[] } {
  const picked = pickQuestions(bank, set, steady);
  return {
    attempt: {
      skillId: "javascript",
      level: 1,
      attemptNumber: set,
      set: picked.set,
      questionIds: picked.questions.map((question) => question.id),
      optionOrders: picked.questions.map(() => [0, 1, 2, 3]),
      answers: [],
      startedAt: NOW,
    },
    questions: picked.questions,
  };
}

function code(action: () => void): number | null {
  try {
    action();
    return null;
  } catch (error) {
    return error instanceof RuleError ? error.status : -1;
  }
}

// answer one question completely (Part A, then Part B at the right position, then Part C if there is one)
function answerAll(attempt: AttemptData, questions: Question[], count: number): AttemptData {
  let current = attempt;
  for (const question of questions.slice(0, count)) {
    let answers = applyAnswer(current, questions, question.id, { partA: question.partA.accepted[0] }, NOW);
    current = { ...current, answers };
    answers = applyAnswer(current, questions, question.id, { partB: question.partB.correct }, NOW);
    current = { ...current, answers };
    if (question.partC) {
      answers = applyAnswer(current, questions, question.id, { partC: "my explanation" }, NOW);
      current = { ...current, answers };
    }
  }
  return current;
}

describe("pickQuestions", () => {
  it("uses the fixed sets for attempts 1 to 3", () => {
    for (const attempt of [1, 2, 3]) {
      const picked = pickQuestions(bank, attempt, steady);
      expect(picked.set).toBe(attempt);
      expect(picked.questions).toHaveLength(21);
      expect(picked.questions.every((question) => question.set === attempt)).toBe(true);
    }
  });

  it("draws as many questions as the level needs (18 at level 2, 15 at level 3) from attempt 4", () => {
    for (const [level, size] of [[2, 18], [3, 15]] as const) {
      const levelBank = getQuestionBank("javascript", level);
      if (!levelBank) throw new Error("missing bank");
      expect(pickQuestions(levelBank, 4).questions).toHaveLength(size);
      expect(pickQuestions(levelBank, 2, steady).questions).toHaveLength(size);
    }
  });

  it("draws 21 questions at random from the whole bank from attempt 4", () => {
    const picked = pickQuestions(bank, 4);
    expect(picked.set).toBeNull();
    expect(picked.questions).toHaveLength(21);
    expect(new Set(picked.questions.map((question) => question.id)).size).toBe(21);
  });
});

describe("shuffle", () => {
  it("keeps every item once", () => {
    expect([...shuffle([0, 1, 2, 3])].sort()).toEqual([0, 1, 2, 3]);
  });
});

describe("opening the questions one by one", () => {
  it("opens only the first question at the start", () => {
    const { attempt, questions } = newAttempt();
    expect(reachedCount(questions, attempt.answers)).toBe(1);
    expect(buildAttemptView(attempt, questions).questions).toHaveLength(1);
  });

  it("refuses an answer to a question that is not open yet", () => {
    const { attempt, questions } = newAttempt();
    expect(code(() => applyAnswer(attempt, questions, questions[1].id, { partA: "x" }, NOW))).toBe(409);
  });

  it("opens the next question when every part of this one is answered", () => {
    const { attempt, questions } = newAttempt();
    const after = answerAll(attempt, questions, 1);
    expect(reachedCount(questions, after.answers)).toBe(2);
    expect(buildAttemptView(after, questions).questions).toHaveLength(2);
  });

  it("opens a question with a Part C only after Part C is written", () => {
    const { attempt, questions } = newAttempt();
    const index = questions.findIndex((question) => question.partC);
    const before = answerAll(attempt, questions, index); // everything before it
    let answers = applyAnswer(before, questions, questions[index].id, { partA: "x" }, NOW);
    let current = { ...before, answers };
    answers = applyAnswer(current, questions, questions[index].id, { partB: 0 }, NOW);
    current = { ...current, answers };
    expect(isComplete(questions[index], current.answers.find((a) => a.questionId === questions[index].id))).toBe(false);
    expect(reachedCount(questions, current.answers)).toBe(index + 1);
  });
});

describe("the order of the parts", () => {
  it("shows Part B only after Part A is saved, and Part C only after Part B is chosen", () => {
    const { attempt, questions } = newAttempt();
    const question = questions[0];

    expect(buildAttemptView(attempt, questions).questions[0].partB).toBeUndefined();

    const withA = { ...attempt, answers: applyAnswer(attempt, questions, question.id, { partA: "string" }, NOW) };
    const viewA = buildAttemptView(withA, questions).questions[0];
    expect(viewA.partA.locked).toBe(true);
    expect(viewA.partB?.options).toHaveLength(4);
    expect(viewA.partC).toBeUndefined();
  });

  it("locks Part A once it is saved", () => {
    const { attempt, questions } = newAttempt();
    const withA = { ...attempt, answers: applyAnswer(attempt, questions, questions[0].id, { partA: "string" }, NOW) };
    expect(code(() => applyAnswer(withA, questions, questions[0].id, { partA: "number" }, NOW))).toBe(409);
  });

  it("needs Part A before Part B, and Part B before Part C", () => {
    const { attempt, questions } = newAttempt();
    expect(code(() => applyAnswer(attempt, questions, questions[0].id, { partB: 0 }, NOW))).toBe(409);

    const index = questions.findIndex((question) => question.partC);
    const before = answerAll(attempt, questions, index);
    const withA = { ...before, answers: applyAnswer(before, questions, questions[index].id, { partA: "x" }, NOW) };
    expect(code(() => applyAnswer(withA, questions, questions[index].id, { partC: "text" }, NOW))).toBe(409);
  });

  it("lets Part B be changed until the test is finished", () => {
    const { attempt, questions } = newAttempt();
    const question = questions[0];
    let current = { ...attempt, answers: applyAnswer(attempt, questions, question.id, { partA: "string" }, NOW) };
    current = { ...current, answers: applyAnswer(current, questions, question.id, { partB: 1 }, NOW) };
    current = { ...current, answers: applyAnswer(current, questions, question.id, { partB: 2 }, NOW) };
    expect(current.answers[0].partB).toBe(2);
  });

  it("refuses an empty Part A, a position that does not exist, and a Part C on a question without one", () => {
    const { attempt, questions } = newAttempt();
    expect(code(() => applyAnswer(attempt, questions, questions[0].id, { partA: "   " }, NOW))).toBe(400);

    const withA = { ...attempt, answers: applyAnswer(attempt, questions, questions[0].id, { partA: "string" }, NOW) };
    expect(code(() => applyAnswer(withA, questions, questions[0].id, { partB: 4 }, NOW))).toBe(400);
    expect(code(() => applyAnswer(withA, questions, questions[0].id, { partC: "text" }, NOW))).toBe(400);
  });

  it("refuses any answer after the test is finished", () => {
    const { attempt, questions } = newAttempt();
    expect(code(() => applyAnswer({ ...attempt, finishedAt: NOW }, questions, questions[0].id, { partA: "x" }, NOW))).toBe(409);
  });
});

describe("shuffled options", () => {
  it("stores the choice as the option's number in the file, and shows it at its position", () => {
    const { attempt, questions } = newAttempt();
    const shuffled: AttemptData = { ...attempt, optionOrders: attempt.optionOrders.map(() => [3, 0, 2, 1]) };
    const question = questions[0];

    let current = { ...shuffled, answers: applyAnswer(shuffled, questions, question.id, { partA: "string" }, NOW) };
    current = { ...current, answers: applyAnswer(current, questions, question.id, { partB: 0 }, NOW) }; // the first option shown

    expect(current.answers[0].partB).toBe(3); // the file's option number
    const view = buildAttemptView(current, questions).questions[0];
    expect(view.partB?.options[0]).toBe(question.partB.options[3]);
    expect(view.partB?.chosen).toBe(0);
  });
});

describe("what the screen is sent", () => {
  it("never contains the correct answers, the key points or the model answers", () => {
    const { attempt, questions } = newAttempt();
    const done = answerAll(attempt, questions, 21);
    const text = JSON.stringify(buildAttemptView(done, questions));
    expect(text).not.toContain('"accepted"');
    expect(text).not.toContain('"correct"');
    expect(text).not.toContain("keyPoints");
    expect(text).not.toContain("modelAnswer");
  });

  it("names the skill and the level, and the points needed, for the title and the result", () => {
    const { attempt, questions } = newAttempt();
    const view = buildAttemptView(attempt, questions, "abc");
    expect(view).toMatchObject({ id: "abc", skillName: "JavaScript", levelName: "Basics", needed: 19, total: 21 });
  });

  it("is complete when every question is answered", () => {
    const { attempt, questions } = newAttempt();
    expect(allComplete(questions, attempt.answers)).toBe(false);
    expect(allComplete(questions, answerAll(attempt, questions, 21).answers)).toBe(true);
  });
});

describe("Part C marking", () => {
  it("lists the questions that have a Part C, with his answers", () => {
    const { attempt, questions } = newAttempt();
    const done = answerAll(attempt, questions, 21);
    const items = partCItems(questions, done.answers);
    expect(items).toHaveLength(3);
    expect(items[0].answer).toBe("my explanation");
  });

  it("counts only key points that exist, once each", () => {
    const { attempt, questions } = newAttempt();
    const items = partCItems(questions, answerAll(attempt, questions, 21).answers);
    const counts = coveredCounts(
      { results: [{ id: items[0].id, covered: [1, 1, 2, 9] }] },
      items
    );
    expect(counts.get(items[0].id)).toEqual([1, 2]);
    expect(counts.get(items[1].id)).toEqual([]);
  });
});
