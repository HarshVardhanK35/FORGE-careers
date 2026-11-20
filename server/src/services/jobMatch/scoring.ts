import { SKILL_ALIASES } from "../../data/skillAliases";

export const REQUIRED_WEIGHT = 2;
export const NICE_TO_HAVE_WEIGHT = 1;

// a few names with a slash are one skill
const KEEP_TOGETHER = new Set(["ci/cd", "tcp/ip", "i/o", "ui/ux", "pl/sql"]);

// One name from the AI may hold several skills: "HTML/CSS", "Redux, Context API".
// A note in brackets is dropped. A known alias or a name from KEEP_TOGETHER stays whole.
export function splitSkills(name: string): string[] {
  const plain = name.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  const key = plain.toLowerCase();
  if (SKILL_ALIASES[key] || KEEP_TOGETHER.has(key)) return [plain];
  return plain.split(/\s*[,;/]\s*/).filter(Boolean);
}

// "ReactJS" -> "React"; "JavaScript (ES6+)" -> "JavaScript"; unknown names are kept as written
export function normaliseSkill(name: string): string {
  const cleaned = name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*\([^)]*\)\s*$/, "") // a note in brackets at the end: "JavaScript (ES6+)"
    .replace(/(\d)\+$/, "$1"); // a plus after a number: "ES6+"
  return SKILL_ALIASES[cleaned.toLowerCase()] ?? cleaned;
}

// the key used to compare two skills
function skillKey(name: string): string {
  return normaliseSkill(name).toLowerCase();
}

// removes repeats, keeps the first spelling
function uniqueSkills(names: string[]): { key: string; label: string }[] {
  const seen = new Map<string, string>();
  for (const name of names) {
    const key = skillKey(name);
    if (key && !seen.has(key)) seen.set(key, normaliseSkill(name));
  }
  return [...seen.entries()].map(([key, label]) => ({ key, label }));
}

export interface ScoreInput {
  required: string[];
  niceToHave: string[];
  resume: string[];
  threshold: number;
}

export interface ScoreResult {
  percent: number;
  decision: "apply" | "skip";
  matchedRequired: string[];
  matchedNiceToHave: string[];
  missingRequired: string[];
  missingNiceToHave: string[];
  earnedPoints: number;
  totalPoints: number;
}

export function scoreMatch(input: ScoreInput): ScoreResult {
  const have = new Set(input.resume.flatMap(splitSkills).map(skillKey));

  const required = uniqueSkills(input.required.flatMap(splitSkills));
  const requiredKeys = new Set(required.map((s) => s.key));
  // a skill listed as both counts only as required
  const niceToHave = uniqueSkills(input.niceToHave.flatMap(splitSkills)).filter((s) => !requiredKeys.has(s.key));

  const matchedRequired = required.filter((s) => have.has(s.key)).map((s) => s.label);
  const missingRequired = required.filter((s) => !have.has(s.key)).map((s) => s.label);
  const matchedNiceToHave = niceToHave.filter((s) => have.has(s.key)).map((s) => s.label);
  const missingNiceToHave = niceToHave.filter((s) => !have.has(s.key)).map((s) => s.label);

  const totalPoints = required.length * REQUIRED_WEIGHT + niceToHave.length * NICE_TO_HAVE_WEIGHT;
  const earnedPoints =
    matchedRequired.length * REQUIRED_WEIGHT + matchedNiceToHave.length * NICE_TO_HAVE_WEIGHT;
  const percent = totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100);

  return {
    percent,
    decision: percent >= input.threshold ? "apply" : "skip",
    matchedRequired,
    matchedNiceToHave,
    missingRequired,
    missingNiceToHave,
    earnedPoints,
    totalPoints,
  };
}

// a note only; it is not part of the score
export function yearsNote(required: number | null | undefined, have: number): string | null {
  if (required === null || required === undefined) return null;
  const verdict = have >= required ? "you meet it" : "below it";
  return `The job asks for ${required}+ years. Your profile shows ${have}: ${verdict}.`;
}
