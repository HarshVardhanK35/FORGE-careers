import { scoreMatch, normaliseSkill, yearsNote } from "../src/services/jobMatch/scoring";

describe("scoreMatch", () => {
  it("gives 100 and apply for a full match", () => {
    const result = scoreMatch({
      required: ["React", "Node.js"],
      niceToHave: ["Docker"],
      resume: ["React", "Node.js", "Docker"],
      threshold: 85,
    });

    expect(result.percent).toBe(100);
    expect(result.decision).toBe("apply");
    expect(result.missingRequired).toEqual([]);
  });

  it("scores a partial match", () => {
    const result = scoreMatch({
      required: ["React", "Node.js", "MongoDB", "Express"],
      niceToHave: ["Docker", "TypeScript"],
      resume: ["react", "nodejs", "MongoDB", "TypeScript", "Git"],
      threshold: 85,
    });

    expect(result.earnedPoints).toBe(7);
    expect(result.totalPoints).toBe(10);
    expect(result.percent).toBe(70);
    expect(result.decision).toBe("skip");
    expect(result.matchedRequired).toEqual(["React", "Node.js", "MongoDB"]);
    expect(result.missingRequired).toEqual(["Express"]);
    expect(result.matchedNiceToHave).toEqual(["TypeScript"]);
    expect(result.missingNiceToHave).toEqual(["Docker"]);
  });

  it("matches aliases and ignores case", () => {
    const result = scoreMatch({
      required: ["Node.js", "React"],
      niceToHave: [],
      resume: ["nodejs", "REACTJS"],
      threshold: 85,
    });

    expect(result.percent).toBe(100);
  });

  it("counts a repeated skill once", () => {
    const result = scoreMatch({
      required: ["React", "react", "ReactJS"],
      niceToHave: [],
      resume: ["React"],
      threshold: 85,
    });

    expect(result.totalPoints).toBe(2);
    expect(result.percent).toBe(100);
  });

  it("counts a skill listed as required and nice-to-have only as required", () => {
    const result = scoreMatch({
      required: ["React"],
      niceToHave: ["React", "Docker"],
      resume: ["React"],
      threshold: 85,
    });

    expect(result.totalPoints).toBe(3);
    expect(result.earnedPoints).toBe(2);
    expect(result.matchedNiceToHave).toEqual([]);
    expect(result.missingNiceToHave).toEqual(["Docker"]);
  });

  it("returns 0 percent and skip when the job lists no skills", () => {
    const result = scoreMatch({ required: [], niceToHave: [], resume: ["React"], threshold: 85 });

    expect(result.totalPoints).toBe(0);
    expect(result.percent).toBe(0);
    expect(result.decision).toBe("skip");
  });

  it("applies at exactly the threshold", () => {
    const input = { required: ["React", "Node.js"], niceToHave: [], resume: ["React"] };

    expect(scoreMatch({ ...input, threshold: 50 }).decision).toBe("apply");
    expect(scoreMatch({ ...input, threshold: 51 }).decision).toBe("skip");
  });
});

describe("normaliseSkill", () => {
  it("turns a known alias into the standard name", () => {
    expect(normaliseSkill("nodejs")).toBe("Node.js");
  });

  it("keeps an unknown skill as written, trimmed", () => {
    expect(normaliseSkill("  Rust ")).toBe("Rust");
  });

  it("collapses extra spaces before looking up an alias", () => {
    expect(normaliseSkill("node   js")).toBe("Node.js");
  });
});

describe("yearsNote", () => {
  it("returns null when the job does not say", () => {
    expect(yearsNote(null, 2)).toBeNull();
    expect(yearsNote(undefined, 2)).toBeNull();
  });

  it("says you meet the requirement", () => {
    expect(yearsNote(3, 3)).toBe("The job asks for 3+ years. Your profile shows 3: you meet it.");
  });

  it("says you are below the requirement", () => {
    expect(yearsNote(3, 2)).toBe("The job asks for 3+ years. Your profile shows 2: below it.");
  });
});
