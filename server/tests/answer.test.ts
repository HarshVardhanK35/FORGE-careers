import { parseAnswerText, checkAnswer } from "../src/services/jobMatch/answer";

describe("parseAnswerText", () => {
  it("reads JSON wrapped in words and code fences", () => {
    const text =
      'Here you go:\n```json\n{"requiredSkills":["React"],"niceToHaveSkills":[],"resumeSkills":["React"],"yearsRequired":null}\n```';

    const result = parseAnswerText(text);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.requiredSkills).toEqual(["React"]);
    }
  });

  it("rejects text with no JSON object", () => {
    const result = parseAnswerText("hello");

    expect(result).toEqual({ ok: false, message: "No JSON object found in the answer" });
  });

  it("rejects broken JSON", () => {
    const result = parseAnswerText("{not json}");

    expect(result).toEqual({ ok: false, message: "The answer is not valid JSON" });
  });
});

describe("checkAnswer", () => {
  it("names the field that is missing", () => {
    const result = checkAnswer({ niceToHaveSkills: [], resumeSkills: [] });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toContain("requiredSkills");
    }
  });
});
