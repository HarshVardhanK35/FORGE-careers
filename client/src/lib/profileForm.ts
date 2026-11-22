// The Profile and settings form: its shape, the conversion from and to the server, and the checks.
// The profile and the settings are edited together and saved with one button.

import type { CareerGap, Profile, Settings } from "./types";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const FIRST_YEAR = 2020;
export const MAX_GAPS = 10;

export const NAME_MAX = 30;
export const ROLE_MAX = 60;
export const GAP_TEXT_MAX = 200;

// the AI models to choose from (the ids are the server's); the tip says what each is best for
export const AI_MODELS = [
  { value: "openai/gpt-oss-120b", label: "gpt-oss-120b", tip: "Best quality. Use it for resume checks and coaching." },
  { value: "openai/gpt-oss-20b", label: "gpt-oss-20b", tip: "Faster and lighter." },
  { value: "qwen/qwen3.8-27b", label: "qwen3.8-27b", tip: "A different style. Use it if the others hit their limit." },
];

const now = new Date();
export const CURRENT_YEAR = now.getFullYear();
export const CURRENT_MONTH = now.getMonth() + 1; // 1 to 12

export interface GapForm extends CareerGap {
  id: string; // only for the list keys, never sent to the server
}

// every field is the text of its input, so a half-typed value can be shown and checked
export interface ProfileFormState {
  name: string;
  targetRole: string;
  years: string;
  months: string;
  hours: string;
  gaps: GapForm[];
  applyThreshold: string;
  dailyApplicationGoal: string;
  dailyAiCallCap: string;
  aiModel: string;
}

let lastGapId = 0;

export function newGap(): GapForm {
  lastGapId += 1;
  return {
    id: `gap-${lastGapId}`,
    text: "",
    fromMonth: CURRENT_MONTH,
    fromYear: CURRENT_YEAR,
    toMonth: CURRENT_MONTH,
    toYear: CURRENT_YEAR,
  };
}

// the gaps in date order: the earliest start first
export function sortGaps(gaps: GapForm[]): GapForm[] {
  const start = (gap: GapForm) => gap.fromYear * 12 + gap.fromMonth;
  const end = (gap: GapForm) => gap.toYear * 12 + gap.toMonth;
  return [...gaps].sort((a, b) => start(a) - start(b) || end(a) - end(b));
}

// the saved profile and settings become the form
export function toForm(profile: Profile, settings: Settings): ProfileFormState {
  // 2.75 years is 2 years and 9 months (the small number guards against 2.9999)
  const years = Math.floor(profile.yearsOfExperience + 1e-9);
  const months = Math.round((profile.yearsOfExperience - years) * 12);

  return {
    name: profile.name,
    targetRole: profile.targetRole,
    years: String(years),
    months: String(months),
    hours: String(profile.hoursPerDay),
    gaps: sortGaps(
      (profile.careerGaps ?? []).map((gap) => {
        lastGapId += 1;
        return { ...gap, id: `gap-${lastGapId}` };
      })
    ),
    applyThreshold: String(settings.applyThreshold),
    dailyApplicationGoal: String(settings.dailyApplicationGoal),
    dailyAiCallCap: String(settings.dailyAiCallCap),
    aiModel: settings.aiModel,
  };
}

// what PUT /profile receives
export function toProfileBody(form: ProfileFormState) {
  return {
    name: form.name.trim(),
    targetRole: form.targetRole.trim(),
    yearsOfExperience: Number(form.years) + Number(form.months) / 12,
    hoursPerDay: Number(form.hours),
    careerGaps: form.gaps.map(({ id: _id, ...gap }) => ({ ...gap, text: gap.text.trim() })),
  };
}

// what PUT /settings receives
export function toSettingsBody(form: ProfileFormState) {
  return {
    applyThreshold: Number(form.applyThreshold),
    dailyApplicationGoal: Number(form.dailyApplicationGoal),
    dailyAiCallCap: Number(form.dailyAiCallCap),
    aiModel: form.aiModel,
  };
}

export type FieldKey =
  | "name"
  | "targetRole"
  | "years"
  | "months"
  | "hours"
  | "applyThreshold"
  | "dailyApplicationGoal"
  | "dailyAiCallCap";

interface GapErrors {
  text?: string;
  range?: string;
}

export interface FormErrors {
  fields: Partial<Record<FieldKey, string>>;
  gaps: Record<string, GapErrors>; // by the gap id
}

function wholeNumber(value: string, min: number, max: number): string {
  const text = value.trim();
  if (!/^\d+$/.test(text) || Number(text) < min || Number(text) > max) {
    return `Enter a whole number from ${min} to ${max}.`;
  }
  return "";
}

export function validate(form: ProfileFormState): FormErrors {
  const fields: FormErrors["fields"] = {};

  if (!form.name.trim()) fields.name = "Enter your name.";
  else if (form.name.length > NAME_MAX) fields.name = `Use ${NAME_MAX} characters or fewer.`;

  if (form.targetRole.length > ROLE_MAX) fields.targetRole = `Use ${ROLE_MAX} characters or fewer.`;

  const years = wholeNumber(form.years, 0, 40);
  if (years) fields.years = `Years: ${years}`;
  const months = wholeNumber(form.months, 0, 11);
  if (months) fields.months = `Months: ${months}`;
  const hours = wholeNumber(form.hours, 0, 24);
  if (hours) fields.hours = hours;

  const apply = wholeNumber(form.applyThreshold, 0, 100);
  if (apply) fields.applyThreshold = apply;
  const goal = wholeNumber(form.dailyApplicationGoal, 1, 50);
  if (goal) fields.dailyApplicationGoal = goal;
  const cap = wholeNumber(form.dailyAiCallCap, 0, 500);
  if (cap) fields.dailyAiCallCap = cap;

  const current = CURRENT_YEAR * 12 + CURRENT_MONTH;
  const gaps: FormErrors["gaps"] = {};
  for (const gap of form.gaps) {
    const errors: GapErrors = {};
    const from = gap.fromYear * 12 + gap.fromMonth;
    const to = gap.toYear * 12 + gap.toMonth;

    if (!gap.text.trim()) errors.text = "Enter a short text.";
    else if (gap.text.length > GAP_TEXT_MAX) errors.text = `Use ${GAP_TEXT_MAX} characters or fewer.`;
    if (from > current || to > current) errors.range = "Dates can't be in the future.";
    else if (from > to) errors.range = "'From' must not be after 'To'";

    if (errors.text || errors.range) gaps[gap.id] = errors;
  }

  return { fields, gaps };
}
