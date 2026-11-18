import type { Bucket, Layer } from "../../models/Skill";

// the focus slots: how many skills can be Primary or Secondary at once
export const FOCUS_LIMITS = {
  technicalPrimary: 3,
  technicalSecondary: 2,
  professional: 1, // any professional skill outside Later
} as const;

// onboarding needs at least this many technical Primary skills
export const MIN_TECHNICAL_PRIMARY = 2;

export interface FocusItem {
  layer: Layer;
  bucket: Bucket;
}

export interface FocusCounts {
  technicalPrimary: number;
  technicalSecondary: number;
  professional: number;
}

export function focusCounts(items: FocusItem[]): FocusCounts {
  return {
    technicalPrimary: items.filter((i) => i.layer === "technical" && i.bucket === "primary").length,
    technicalSecondary: items.filter((i) => i.layer === "technical" && i.bucket === "secondary").length,
    professional: items.filter((i) => i.layer === "professional" && i.bucket !== "later").length,
  };
}

// a message when the counts break a rule, otherwise null
export function focusProblem(counts: FocusCounts, requireMinimum: boolean): string | null {
  if (counts.technicalPrimary > FOCUS_LIMITS.technicalPrimary) {
    return `At most ${FOCUS_LIMITS.technicalPrimary} technical skills can be Primary`;
  }
  if (counts.technicalSecondary > FOCUS_LIMITS.technicalSecondary) {
    return `At most ${FOCUS_LIMITS.technicalSecondary} technical skills can be Secondary`;
  }
  if (counts.professional > FOCUS_LIMITS.professional) {
    return `At most ${FOCUS_LIMITS.professional} professional skill can be in focus`;
  }
  if (requireMinimum && counts.technicalPrimary < MIN_TECHNICAL_PRIMARY) {
    return `Choose at least ${MIN_TECHNICAL_PRIMARY} technical skills as Primary`;
  }
  return null;
}
