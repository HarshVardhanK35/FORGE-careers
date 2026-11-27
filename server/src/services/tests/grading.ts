// Grading, as plain functions: comparing a typed answer, the points of a question, and the time taken.
// A question is worth 6 "sixths" so that half (A and B) and third (A, B and C) shares are whole numbers.

import type { Question } from "../../data/questions/types";

export const POINTS_PER_QUESTION = 6;

// A typed output is compared after removing line endings, extra spaces and empty lines around it.
export function normalizeOutput(text: string): string {
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .join("\n")
    .trim();
}

export function isPartACorrect(question: Question, answer: string | undefined): boolean {
  if (answer === undefined) return false;
  // a page question (HTML and CSS) or a React question is about a word, a number or a short text shown on a page,
  // so capital letters do not matter there (a JavaScript output keeps them)
  const ignoresCase = question.environment === "page" || question.environment === "react";
  const same = (text: string) => (ignoresCase ? normalizeOutput(text).toLowerCase() : normalizeOutput(text));
  return question.partA.accepted.some((accepted) => same(accepted) === same(answer));
}

// the option he chose, as its number in the question file (not its position on the screen)
export function isPartBCorrect(question: Question, chosen: number | undefined): boolean {
  return chosen !== undefined && chosen === question.partB.correct;
}

// the share of each part, in sixths: A and B half each, or A, B and C a third each
export function partWeights(question: Question): { a: number; b: number; c: number } {
  return question.partC ? { a: 2, b: 2, c: 2 } : { a: 3, b: 3, c: 0 };
}

// Part C: the more key points the answer covers, the more of its share it gets (full, half or nothing)
export function partCPoints(question: Question, coveredCount: number): number {
  if (!question.partC) return 0;
  const weight = partWeights(question).c;
  const share = coveredCount / question.partC.keyPoints.length;
  if (share >= 0.75) return weight;
  if (share >= 0.4) return weight / 2;
  return 0;
}

export interface QuestionScore {
  a: number;
  b: number;
  c: number;
  total: number;
}

export function scoreQuestion(
  question: Question,
  answer: { partA?: string; partB?: number },
  coveredCount: number
): QuestionScore {
  const weights = partWeights(question);
  const a = isPartACorrect(question, answer.partA) ? weights.a : 0;
  const b = isPartBCorrect(question, answer.partB) ? weights.b : 0;
  const c = partCPoints(question, coveredCount);
  return { a, b, c, total: a + b + c };
}

// the sum of the sixths as questions' worth ("19" means 19 whole questions)
export function toQuestionPoints(sixths: number): number {
  return sixths / POINTS_PER_QUESTION;
}

// Time spent: the gaps between his actions, ignoring a gap longer than the limit (a pause or a night away).
export function activeTimeMs(times: Date[], maxGapMs = 5 * 60 * 1000): number {
  const sorted = [...times].sort((first, second) => first.getTime() - second.getTime());
  let total = 0;
  for (let index = 1; index < sorted.length; index++) {
    const gap = sorted[index].getTime() - sorted[index - 1].getTime();
    if (gap <= maxGapMs) total += gap;
  }
  return total;
}
