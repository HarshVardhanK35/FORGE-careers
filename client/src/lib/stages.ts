import type { RoundResult, RoundType, Stage, StageChange } from "./types";

// the steps on the way to an offer, in order ("hold" and "rejected" are not steps: they can come at any time)
export const WAY: Stage[] = ["applied", "response_received", "shortlisted", "interviewing", "succeeded"];

// the furthest step reached so far, as a position in WAY (-1 when there is none)
export function furthestStep(history: StageChange[]): number {
  return Math.max(-1, ...history.map((change) => WAY.indexOf(change.stage)));
}

// An application never goes back to a step before the furthest one it has reached
// (the server refuses it too). Hold and rejected are allowed at any time.
export function canMoveTo(target: Stage, history: StageChange[]): boolean {
  const position = WAY.indexOf(target);
  return position === -1 || position >= furthestStep(history);
}

// the stages in the order of an application's life
export const STAGE_ORDER: Stage[] = [
  "applied",
  "response_received",
  "shortlisted",
  "interviewing",
  "hold",
  "rejected",
  "succeeded",
];

export const STAGE_LABELS: Record<Stage, string> = {
  applied: "Applied",
  response_received: "Response received",
  shortlisted: "Shortlisted",
  interviewing: "Interviewing",
  hold: "On hold",
  rejected: "Rejected",
  succeeded: "Offer received",
};

// a rejected or succeeded application is final: its stage cannot change and it cannot be deleted
export function isFinalStage(stage: Stage): boolean {
  return stage === "rejected" || stage === "succeeded";
}

export const ROUND_TYPE_LABELS: Record<RoundType, string> = {
  technical: "Technical",
  hr: "HR",
  managerial: "Managerial",
  other: "Other",
};

export const ROUND_RESULT_LABELS: Record<RoundResult, string> = {
  pending: "Pending",
  passed: "Passed",
  failed: "Failed",
};
