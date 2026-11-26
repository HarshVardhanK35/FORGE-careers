import { getQuestion } from "../src/data/questions";
import type { Question } from "../src/data/questions/types";
import {
  activeTimeMs,
  isPartACorrect,
  isPartBCorrect,
  normalizeOutput,
  partCPoints,
  partWeights,
  scoreQuestion,
  toQuestionPoints,
} from "../src/services/tests/grading";

// a question with and without Part C, taken from the real data
const withoutC = getQuestion("javascript", 1, "js-values-types-l1-s1-q01") as Question;
const withC = getQuestion("javascript", 1, "js-closures-l1-s1-q14") as Question;

describe("normalizeOutput", () => {
  it("ignores line endings, extra spaces and empty lines around the text", () => {
    expect(normalizeOutput("  1 \r\n  2  \r\n")).toBe("1\n2");
    expect(normalizeOutput("inner   3\nouter 2")).toBe("inner 3\nouter 2");
    expect(normalizeOutput("\n\nhello\n\n")).toBe("hello");
  });

  it("keeps the case and the words", () => {
    expect(normalizeOutput("Done")).not.toBe(normalizeOutput("done"));
  });
});

describe("Part A and Part B", () => {
  it("accepts the printed output in any spacing", () => {
    expect(isPartACorrect(withoutC, "string")).toBe(true);
    expect(isPartACorrect(withoutC, "  string \n")).toBe(true);
    expect(isPartACorrect(withoutC, "'string'")).toBe(false);
    expect(isPartACorrect(withoutC, undefined)).toBe(false);
  });

  it("ignores capital letters in the answer to a page question, but not in a JavaScript output", () => {
    const colour = getQuestion("css", 1, "hc-cascade-specificity-l1-s1-q07") as Question;
    expect(isPartACorrect(colour, "Red")).toBe(true);
    expect(isPartACorrect(colour, " RGB(255,  0, 0) ")).toBe(true);
    expect(isPartACorrect(colour, "rgb(255,0,0)")).toBe(false); // a missing space still counts as different
    expect(isPartACorrect(colour, "rgb(255, 0, 0)")).toBe(true);
    expect(isPartACorrect(withoutC, "String")).toBe(false);
  });

  it("accepts a multi-line output typed with its line breaks", () => {
    const loop = getQuestion("javascript", 1, "js-control-flow-l1-s1-q06") as Question;
    expect(isPartACorrect(loop, "1\n2\n3")).toBe(true);
    expect(isPartACorrect(loop, "1 2 3")).toBe(false);
  });

  it("checks Part B by the option's number in the file", () => {
    expect(isPartBCorrect(withoutC, withoutC.partB.correct)).toBe(true);
    expect(isPartBCorrect(withoutC, (withoutC.partB.correct + 1) % 4)).toBe(false);
    expect(isPartBCorrect(withoutC, undefined)).toBe(false);
  });
});

describe("points", () => {
  it("shares a question between its parts in sixths", () => {
    expect(partWeights(withoutC)).toEqual({ a: 3, b: 3, c: 0 });
    expect(partWeights(withC)).toEqual({ a: 2, b: 2, c: 2 });
  });

  it("gives Part C full points for most key points, half for some, nothing for few", () => {
    // closures has 3 key points
    expect(partCPoints(withC, 3)).toBe(2);
    expect(partCPoints(withC, 2)).toBe(1);
    expect(partCPoints(withC, 1)).toBe(0);
    expect(partCPoints(withC, 0)).toBe(0);
    expect(partCPoints(withoutC, 3)).toBe(0);
  });

  it("scores a whole question as 6 sixths", () => {
    const right = { partA: "string", partB: withoutC.partB.correct };
    expect(scoreQuestion(withoutC, right, 0).total).toBe(6);
    expect(scoreQuestion(withoutC, { partA: "number", partB: withoutC.partB.correct }, 0).total).toBe(3);
    expect(scoreQuestion(withoutC, { partA: "string", partB: (withoutC.partB.correct + 1) % 4 }, 0).total).toBe(3);

    const closure = { partA: withC.partA.accepted[0], partB: withC.partB.correct };
    expect(scoreQuestion(withC, closure, 3).total).toBe(6);
    expect(scoreQuestion(withC, closure, 2).total).toBe(5);
    expect(scoreQuestion(withC, closure, 0).total).toBe(4);
  });

  it("turns sixths into questions' worth", () => {
    expect(toQuestionPoints(114)).toBe(19);
    expect(toQuestionPoints(113)).toBeCloseTo(18.83, 2);
  });
});

describe("activeTimeMs", () => {
  const at = (minutes: number) => new Date(2026, 10, 25, 10, minutes);

  it("adds the gaps between his actions", () => {
    expect(activeTimeMs([at(0), at(2), at(5)])).toBe(5 * 60_000);
  });

  it("ignores a long pause (over 5 minutes by default)", () => {
    expect(activeTimeMs([at(0), at(2), at(40), at(42)])).toBe(4 * 60_000);
  });

  it("does not depend on the order of the times", () => {
    expect(activeTimeMs([at(5), at(0), at(2)])).toBe(5 * 60_000);
    expect(activeTimeMs([at(0)])).toBe(0);
    expect(activeTimeMs([])).toBe(0);
  });
});
