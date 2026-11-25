// Small helpers for the Skills page: the wait countdown, the level state right now,
// and the one-line status of a skill. The server decides what is open; this only reads its answer.

import type { LevelState, RoadmapLevel, RoadmapSkill, SkillTier } from "./types";

export const TIER_LABELS: Record<SkillTier, string> = {
  required: "REQUIRED",
  moderate: "MODERATE",
  skippable: "SKIPPABLE",
};

export const TIERS: SkillTier[] = ["required", "moderate", "skippable"];

// "2 h 40 min" (at least 1 min), from the time left in milliseconds
export function formatWait(msLeft: number): string {
  const minutes = Math.max(1, Math.ceil(msLeft / 60_000));
  const hours = Math.floor(minutes / 60);
  return hours > 0 ? `${hours} h ${minutes % 60} min` : `${minutes} min`;
}

// A level that was waiting becomes open when its time has come (the server says "waiting" until the page reloads).
export function stateNow(level: RoadmapLevel, now: number): LevelState {
  if (level.state === "waiting" && level.nextAttemptAt && new Date(level.nextAttemptAt).getTime() <= now) {
    return "open";
  }
  return level.state;
}

// the little mark of a level: locked, open, in progress, passed or skipped
export type MarkKind = "locked" | "open" | "progress" | "passed" | "skipped";

export function markOf(level: RoadmapLevel, now: number): MarkKind {
  const state = stateNow(level, now);
  if (state === "waiting") return "progress";
  if (state === "open" && level.attempts > 0) return "progress";
  return state;
}

export type StatusKind = "locked" | "passed" | "skipped" | "waiting" | "ready" | "soon" | "progress" | "new";

export interface SkillStatus {
  kind: StatusKind;
  text: string;
  tone: "muted" | "ok" | "warn" | "accent";
  // a small link in the row: "Unlock anyway" or "Take it now"
  action: "unlock" | "open" | null;
}

export function skillStatus(skill: RoadmapSkill, now: number): SkillStatus {
  const states = skill.levels.map((level) => stateNow(level, now));
  const skipped = skill.levels.find((_, index) => states[index] === "skipped");
  const waiting = skill.levels.find((_, index) => states[index] === "waiting");
  const open = skill.levels.find((_, index) => states[index] === "open");

  if (!skill.unlocked) return { kind: "locked", text: "Locked", tone: "muted", action: "unlock" };
  if (states.every((state) => state === "passed")) return { kind: "passed", text: "All levels passed", tone: "ok", action: null };
  if (skipped) return { kind: "skipped", text: `L${skipped.level} skipped`, tone: "warn", action: "open" };
  if (waiting && waiting.nextAttemptAt) {
    const left = new Date(waiting.nextAttemptAt).getTime() - now;
    return { kind: "waiting", text: `L${waiting.level} · Next attempt in ${formatWait(left)}`, tone: "warn", action: null };
  }
  if (open) return { kind: "ready", text: `L${open.level} test ready`, tone: "accent", action: null };
  if (skill.topicsTotal === 0) return { kind: "soon", text: "Topics coming soon", tone: "muted", action: null };
  if (skill.topicsDone > 0) return { kind: "progress", text: "Topics in progress", tone: "accent", action: null };
  return { kind: "new", text: "Not started", tone: "accent", action: null };
}
