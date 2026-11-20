import { furthestStep, goesBack } from "../src/services/applications/stageRules";
import type { Stage } from "../src/models/Application";

function history(...stages: Stage[]) {
  return stages.map((stage) => ({ stage }));
}

describe("furthestStep", () => {
  it("is -1 for an empty history", () => {
    expect(furthestStep([])).toBe(-1);
  });

  it("ignores hold and rejected", () => {
    expect(furthestStep(history("applied", "shortlisted", "hold"))).toBe(2);
  });
});

describe("goesBack", () => {
  it("blocks a step before the furthest one", () => {
    expect(goesBack(history("applied", "interviewing"), "shortlisted")).toBe(true);
    expect(goesBack(history("applied", "interviewing"), "applied")).toBe(true);
  });

  it("allows going forward and skipping steps", () => {
    expect(goesBack(history("applied"), "interviewing")).toBe(false);
    expect(goesBack(history("applied", "response_received"), "shortlisted")).toBe(false);
  });

  it("allows hold and rejected at any time", () => {
    expect(goesBack(history("applied", "interviewing"), "hold")).toBe(false);
    expect(goesBack(history("applied", "interviewing"), "rejected")).toBe(false);
  });

  it("allows resuming the same step after a hold", () => {
    expect(goesBack(history("applied", "interviewing", "hold"), "interviewing")).toBe(false);
  });

  it("blocks an earlier step after a hold", () => {
    expect(goesBack(history("applied", "interviewing", "hold"), "shortlisted")).toBe(true);
  });
});
