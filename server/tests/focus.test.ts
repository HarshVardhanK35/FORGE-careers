import { focusCounts, focusProblem } from "../src/services/onboarding/focus";
import type { FocusItem } from "../src/services/onboarding/focus";

function item(layer: FocusItem["layer"], bucket: FocusItem["bucket"]): FocusItem {
  return { layer, bucket };
}

describe("focusCounts", () => {
  it("counts each slot and ignores Later skills", () => {
    const counts = focusCounts([
      item("technical", "primary"),
      item("technical", "primary"),
      item("technical", "secondary"),
      item("technical", "later"),
      item("professional", "secondary"),
      item("professional", "later"),
    ]);

    expect(counts).toEqual({ technicalPrimary: 2, technicalSecondary: 1, professional: 1 });
  });
});

describe("focusProblem", () => {
  it("accepts the full set: 3 Primary, 2 Secondary, 1 professional", () => {
    expect(focusProblem({ technicalPrimary: 3, technicalSecondary: 2, professional: 1 }, true)).toBeNull();
  });

  it("accepts 2 Primary, 2 Secondary and 1 professional", () => {
    expect(focusProblem({ technicalPrimary: 2, technicalSecondary: 2, professional: 1 }, true)).toBeNull();
  });

  it("rejects a fourth technical Primary", () => {
    expect(focusProblem({ technicalPrimary: 4, technicalSecondary: 0, professional: 0 }, false)).toBe(
      "At most 3 technical skills can be Primary"
    );
  });

  it("rejects a third technical Secondary", () => {
    expect(focusProblem({ technicalPrimary: 2, technicalSecondary: 3, professional: 0 }, false)).toBe(
      "At most 2 technical skills can be Secondary"
    );
  });

  it("rejects a second professional skill", () => {
    expect(focusProblem({ technicalPrimary: 2, technicalSecondary: 0, professional: 2 }, false)).toBe(
      "At most 1 professional skill can be in focus"
    );
  });

  it("needs 2 technical Primary only when the minimum is required", () => {
    const counts = { technicalPrimary: 1, technicalSecondary: 0, professional: 0 };

    expect(focusProblem(counts, true)).toBe("Choose at least 2 technical skills as Primary");
    expect(focusProblem(counts, false)).toBeNull();
  });
});
