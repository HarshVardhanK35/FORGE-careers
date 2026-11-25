// The rules of the skill roadmap, as plain functions (no database, so they are easy to test).
// What is open, locked, waiting, passed or skipped is worked out here from what he DID
// (his ticks, results and unlocks), every time; none of it is stored.

import { hasNotes } from "../../data/content";
import { ROADMAP_PROJECTS, ROADMAP_SKILLS } from "../../data/roadmap";
import type { RoadmapSkill, Tier } from "../../data/roadmap";

import type { ILevelProgress } from "../../models/RoadmapProgress";

export type LevelNumber = 1 | 2 | 3;
export type LevelData = ILevelProgress;

// everything he did, as plain data
export interface ProgressData {
  doneTopics: string[];
  resources: { topicId: string; text: string }[];
  levels: LevelData[];
  manualUnlocks: string[];
  studiedFlows: string[];
}

// the fixed rules of the three levels
export const LEVEL_RULES: { level: LevelNumber; name: string; total: number; needed: number; passMark: number; waitHours: number }[] = [
  { level: 1, name: "Basics", total: 21, needed: 19, passMark: 90, waitHours: 3 },
  { level: 2, name: "Intermediate", total: 18, needed: 16, passMark: 85, waitHours: 6 },
  { level: 3, name: "Hard", total: 15, needed: 11, passMark: 75, waitHours: 12 },
];

export const RESOURCE_MAX = 300;

// a rule that was broken: the route turns it into an answer with this status
export class RuleError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function emptyProgress(): ProgressData {
  return { doneTopics: [], resources: [], levels: [], manualUnlocks: [], studiedFlows: [] };
}

function levelOf(progress: ProgressData, skillId: string, level: LevelNumber): LevelData {
  return (
    progress.levels.find((item) => item.skillId === skillId && item.level === level) ?? {
      skillId,
      level,
      status: "none",
      attempts: 0,
      bestScore: null,
      nextAttemptAt: null,
    }
  );
}

// the level record to change: the stored one, or a new one added to the list
function levelRecord(progress: ProgressData, skillId: string, level: LevelNumber): LevelData {
  let record = progress.levels.find((item) => item.skillId === skillId && item.level === level);
  if (!record) {
    record = { skillId, level, status: "none", attempts: 0, bestScore: null, nextAttemptAt: null };
    progress.levels.push(record);
  }
  return record;
}

// every level passed or skipped
function isResolved(progress: ProgressData, skillId: string): boolean {
  return LEVEL_RULES.every(({ level }) => levelOf(progress, skillId, level).status !== "none");
}

// the first skill is always open; the others open when the one before is resolved, or by "Unlock anyway"
export function isUnlocked(progress: ProgressData, index: number): boolean {
  if (index === 0) return true;
  const skill = ROADMAP_SKILLS[index];
  return progress.manualUnlocks.includes(skill.id) || isResolved(progress, ROADMAP_SKILLS[index - 1].id);
}

// a skill with no topics yet can never open its tests
function allTopicsDone(progress: ProgressData, skill: RoadmapSkill): boolean {
  return skill.topics.length > 0 && skill.topics.every((topic) => progress.doneTopics.includes(topic.id));
}

export type LevelState = "locked" | "open" | "waiting" | "passed" | "skipped";

// why a level cannot be taken yet, or "" when it can
function whyNotOpen(progress: ProgressData, skill: RoadmapSkill, index: number, level: LevelNumber): string {
  if (!isUnlocked(progress, index)) return "Opens with the skill";
  if (skill.topics.length === 0) return "Topics coming soon";
  if (!allTopicsDone(progress, skill)) return "Tick every topic to open";
  if (level > 1 && levelOf(progress, skill.id, (level - 1) as LevelNumber).status !== "passed") {
    return `Pass L${level - 1} to open`;
  }
  return "";
}

export function levelState(
  progress: ProgressData,
  skill: RoadmapSkill,
  index: number,
  level: LevelNumber,
  now: Date
): { state: LevelState; reason: string } {
  const data = levelOf(progress, skill.id, level);
  const reason = whyNotOpen(progress, skill, index, level);

  if (data.status === "passed") return { state: "passed", reason: "" };
  // a skipped level stays skipped until he takes it (taking it needs the same things as any level)
  if (data.status === "skipped") return { state: "skipped", reason };
  if (reason) return { state: "locked", reason };
  if (data.nextAttemptAt && data.nextAttemptAt.getTime() > now.getTime()) return { state: "waiting", reason: "" };
  return { state: "open", reason: "" };
}

export interface LevelView {
  level: LevelNumber;
  name: string;
  state: LevelState;
  reason: string;
  canTake: boolean;
  attempts: number;
  bestScore: number | null;
  nextAttemptAt: string | null;
  attemptSet: number | null; // 1 to 3 = a fixed set; null = random questions (from attempt 4)
  passMark: number;
  needed: number;
  total: number;
  waitHours: number; // the wait after a failed attempt
}

export interface SkillView {
  id: string;
  name: string;
  tier: Tier;
  order: number;
  unlocked: boolean;
  topicsDone: number;
  topicsTotal: number;
  topics: { id: string; title: string; category: string; priority: "must" | "common"; hasNotes: boolean; done: boolean; resource: string }[];
  levels: LevelView[];
}

export interface RoadmapView {
  skills: SkillView[];
  projects: { id: string; name: string; flowsStudied: number; flowsTotal: number; ready: boolean }[];
}

export function buildView(progress: ProgressData, now: Date = new Date()): RoadmapView {
  const skills = ROADMAP_SKILLS.map((skill, index): SkillView => {
    const topics = skill.topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      category: topic.category,
      priority: topic.priority,
      hasNotes: hasNotes(topic.id), // true when the Learn button has notes to show
      done: progress.doneTopics.includes(topic.id),
      resource: progress.resources.find((item) => item.topicId === topic.id)?.text ?? "",
    }));

    const levels = LEVEL_RULES.map((rule): LevelView => {
      const data = levelOf(progress, skill.id, rule.level);
      const { state, reason } = levelState(progress, skill, index, rule.level, now);
      const next = data.attempts + 1;
      return {
        level: rule.level,
        name: rule.name,
        state,
        reason,
        canTake: state === "open" || (state === "skipped" && reason === ""),
        attempts: data.attempts,
        bestScore: data.bestScore,
        nextAttemptAt: data.nextAttemptAt ? data.nextAttemptAt.toISOString() : null,
        attemptSet: next <= 3 ? next : null,
        passMark: rule.passMark,
        needed: rule.needed,
        total: rule.total,
        waitHours: rule.waitHours,
      };
    });

    return {
      id: skill.id,
      name: skill.name,
      tier: skill.tier,
      order: index + 1,
      unlocked: isUnlocked(progress, index),
      topicsDone: topics.filter((topic) => topic.done).length,
      topicsTotal: topics.length,
      topics,
      levels,
    };
  });

  const projects = ROADMAP_PROJECTS.map((project) => {
    const flowsStudied = project.flows.filter((flow) => progress.studiedFlows.includes(flow.id)).length;
    const flowsTotal = project.flows.length;
    // ready = every flow studied (the 80% question mark comes with the project questions, later)
    return { id: project.id, name: project.name, flowsStudied, flowsTotal, ready: false };
  });

  return { skills, projects };
}

function findTopic(topicId: string): { skill: RoadmapSkill; index: number } {
  const index = ROADMAP_SKILLS.findIndex((skill) => skill.topics.some((topic) => topic.id === topicId));
  if (index === -1) throw new RuleError(404, "Topic not found");
  return { skill: ROADMAP_SKILLS[index], index };
}

// tick or untick a topic, and/or set its resource (a link or a short note)
export function updateTopic(progress: ProgressData, topicId: string, patch: { done?: boolean; resource?: string }): void {
  const { index } = findTopic(topicId);
  if (!isUnlocked(progress, index)) throw new RuleError(409, "This skill is locked");

  if (patch.done !== undefined) {
    const without = progress.doneTopics.filter((id) => id !== topicId);
    progress.doneTopics = patch.done ? [...without, topicId] : without;
  }

  if (patch.resource !== undefined) {
    const text = patch.resource.trim();
    if (text.length > RESOURCE_MAX) throw new RuleError(400, `Keep it under ${RESOURCE_MAX} characters`);
    const others = progress.resources.filter((item) => item.topicId !== topicId);
    progress.resources = text ? [...others, { topicId, text }] : others;
  }
}

// "Unlock anyway": every unpassed level of the skills before it is marked skipped, and the skill opens
export function unlockSkill(progress: ProgressData, skillId: string): void {
  const index = ROADMAP_SKILLS.findIndex((skill) => skill.id === skillId);
  if (index === -1) throw new RuleError(404, "Skill not found");
  if (isUnlocked(progress, index)) throw new RuleError(409, "This skill is already open");

  for (let before = 0; before < index; before++) {
    const id = ROADMAP_SKILLS[before].id;
    if (isResolved(progress, id)) continue;
    for (const { level } of LEVEL_RULES) {
      const record = levelRecord(progress, id, level);
      if (record.status !== "passed") {
        record.status = "skipped";
        record.nextAttemptAt = null;
      }
    }
  }

  progress.manualUnlocks = [...progress.manualUnlocks, skillId];
}

// Record the result of one attempt: how many answers were correct out of the level's total.
// (Later the server will grade the test itself; for now the number comes from the caller.)
export function recordAttempt(
  progress: ProgressData,
  skillId: string,
  level: LevelNumber,
  correct: number,
  now: Date = new Date()
): { passed: boolean; scorePercent: number } {
  const index = ROADMAP_SKILLS.findIndex((skill) => skill.id === skillId);
  if (index === -1) throw new RuleError(404, "Skill not found");
  const skill = ROADMAP_SKILLS[index];
  const rule = LEVEL_RULES[level - 1];

  if (!Number.isInteger(correct) || correct < 0 || correct > rule.total) {
    throw new RuleError(400, `Correct answers must be a whole number from 0 to ${rule.total}`);
  }

  const { state, reason } = levelState(progress, skill, index, level, now);
  if (state === "passed") throw new RuleError(409, "This level is already passed");
  if (state === "locked" || (state === "skipped" && reason)) throw new RuleError(409, reason);
  if (state === "waiting") throw new RuleError(409, "The next attempt is not open yet");

  const record = levelRecord(progress, skillId, level);
  const scorePercent = Math.round((correct / rule.total) * 100);
  const passed = correct >= rule.needed;

  record.attempts += 1;
  record.bestScore = Math.max(record.bestScore ?? 0, scorePercent);
  if (passed) {
    record.status = "passed";
    record.nextAttemptAt = null;
  } else {
    // a skipped level that was taken is now "in progress", not skipped any more
    record.status = "none";
    record.nextAttemptAt = new Date(now.getTime() + rule.waitHours * 60 * 60 * 1000);
  }

  return { passed, scorePercent };
}
