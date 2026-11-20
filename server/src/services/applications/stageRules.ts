import type { Stage } from "../../models/Application";

// the steps on the way to an offer, in order ("hold" and "rejected" are not steps: they can come at any time)
export const WAY: readonly Stage[] = ["applied", "response_received", "shortlisted", "interviewing", "succeeded"];

// the furthest step reached so far, as a position in WAY (-1 when there is none)
export function furthestStep(history: { stage: Stage }[]): number {
  return Math.max(-1, ...history.map((item) => WAY.indexOf(item.stage)));
}

// true when moving to "next" would go back to a step before the furthest one reached
export function goesBack(history: { stage: Stage }[], next: Stage): boolean {
  const position = WAY.indexOf(next);
  if (position === -1) return false; // hold and rejected can come at any time
  return position < furthestStep(history);
}
