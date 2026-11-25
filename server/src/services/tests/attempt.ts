// One test attempt, as plain functions (no database): which questions are chosen, which are open yet,
// what an answer may change, and what the screen is sent. The rules decide; the route only saves.

import { ROADMAP_SKILLS } from "../../data/roadmap";
import type { Question, QuestionBank } from "../../data/questions/types";
import { LEVEL_RULES, RuleError } from "../roadmap/rules";

export const PART_A_MAX = 300;
export const PART_C_MAX = 600;
const SET_SIZE = 21;

export interface AnswerData {
  questionId: string;
  partA?: string; // once saved it is locked
  partB?: number; // the option's number in the question file
  partC?: string;
  partAAt?: Date;
  partBAt?: Date;
  partCAt?: Date;
}

export interface AttemptData {
  skillId: string;
  level: 1 | 2 | 3;
  attemptNumber: number;
  set: number | null; // 1 to 3, or null for random questions
  questionIds: string[];
  optionOrders: number[][]; // for each question, the order its options are shown in (the file's numbers)
  answers: AnswerData[];
  startedAt: Date;
  finishedAt?: Date;
}

// a random number between 0 and 1 (replaced by a fixed one in the tests)
export type Random = () => number;

export function shuffle<T>(items: T[], random: Random = Math.random): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

// Attempts 1 to 3 use the fixed sets 1 to 3; from attempt 4 the questions are drawn at random from the whole bank.
export function pickQuestions(
  bank: QuestionBank,
  attemptNumber: number,
  random: Random = Math.random
): { set: number | null; questions: Question[] } {
  if (attemptNumber <= 3) {
    const questions = bank.questions.filter((question) => question.set === attemptNumber);
    if (questions.length > 0) return { set: attemptNumber, questions };
  }
  return { set: null, questions: shuffle(bank.questions, random).slice(0, SET_SIZE) };
}

export function isComplete(question: Question, answer: AnswerData | undefined): boolean {
  if (!answer || answer.partA === undefined || answer.partB === undefined) return false;
  if (question.partC && !answer.partC?.trim()) return false;
  return true;
}

// the questions he has reached: every question before the first unfinished one, and that one
export function reachedCount(questions: Question[], answers: AnswerData[]): number {
  for (let index = 0; index < questions.length; index++) {
    const answer = answers.find((item) => item.questionId === questions[index].id);
    if (!isComplete(questions[index], answer)) return index + 1;
  }
  return questions.length;
}

export function allComplete(questions: Question[], answers: AnswerData[]): boolean {
  return questions.every((question) => isComplete(question, answers.find((item) => item.questionId === question.id)));
}

export interface AnswerPatch {
  partA?: string;
  partB?: number; // the position he chose on the screen (0 to 3)
  partC?: string;
}

// Save one answer. Part A locks when it is saved; Part B needs Part A; Part C needs Part B; a question needs
// every question before it to be complete. Returns the new list of answers.
export function applyAnswer(
  attempt: AttemptData,
  questions: Question[],
  questionId: string,
  patch: AnswerPatch,
  now: Date = new Date()
): AnswerData[] {
  if (attempt.finishedAt) throw new RuleError(409, "This test is finished");

  const index = questions.findIndex((question) => question.id === questionId);
  if (index === -1) throw new RuleError(404, "Question not found");
  if (index + 1 > reachedCount(questions, attempt.answers)) throw new RuleError(409, "This question is not open yet");

  const question = questions[index];
  const current: AnswerData = { ...(attempt.answers.find((item) => item.questionId === questionId) ?? { questionId }) };

  if (patch.partA !== undefined) {
    if (current.partA !== undefined) throw new RuleError(409, "Part A is locked");
    const text = patch.partA.trim();
    if (!text) throw new RuleError(400, "Type your answer first");
    if (text.length > PART_A_MAX) throw new RuleError(400, `Keep Part A under ${PART_A_MAX} characters`);
    current.partA = text;
    current.partAAt = now;
  }

  if (patch.partB !== undefined) {
    if (current.partA === undefined) throw new RuleError(409, "Answer Part A first");
    const order = attempt.optionOrders[attempt.questionIds.indexOf(questionId)];
    if (!Number.isInteger(patch.partB) || patch.partB < 0 || patch.partB >= order.length) {
      throw new RuleError(400, "Choose one of the options");
    }
    current.partB = order[patch.partB]; // stored as the option's number in the file
    current.partBAt = now;
  }

  if (patch.partC !== undefined) {
    if (!question.partC) throw new RuleError(400, "This question has no Part C");
    if (current.partB === undefined) throw new RuleError(409, "Answer Part B first");
    const text = patch.partC.trim();
    if (text.length > PART_C_MAX) throw new RuleError(400, `Keep Part C under ${PART_C_MAX} characters`);
    current.partC = text;
    current.partCAt = now;
  }

  return [...attempt.answers.filter((item) => item.questionId !== questionId), current];
}

// what the screen is sent for one reached question (never the correct answers)
export interface QuestionView {
  id: string;
  number: number;
  topicId: string;
  topicTitle: string;
  environment: "node" | "browser";
  html?: string;
  code: string;
  partA: { ask: string; answer?: string; locked: boolean };
  partB?: { ask: string; options: string[]; chosen?: number }; // Part B appears after Part A is saved
  partC?: { ask: string; answer?: string; maxLength: number }; // Part C appears after Part B is chosen
  complete: boolean;
}

export interface AttemptView {
  id: string; // the id of the saved attempt: the screen uses it in every later call
  skillId: string;
  skillName: string; // for the title of the screen
  level: number;
  levelName: string; // Basics, Intermediate or Hard
  attemptNumber: number;
  set: number | null;
  total: number;
  needed: number; // the points needed to pass
  reached: number; // how many questions are open
  current: number; // the number (from 1) of the question to show first
  startedAt: string;
  questions: QuestionView[]; // only the reached ones
}

function topicTitle(topicId: string): string {
  for (const skill of ROADMAP_SKILLS) {
    const topic = skill.topics.find((item) => item.id === topicId);
    if (topic) return topic.title;
  }
  return topicId;
}

export function buildAttemptView(attempt: AttemptData, questions: Question[], id = ""): AttemptView {
  const reached = reachedCount(questions, attempt.answers);

  const views = questions.slice(0, reached).map((question, index): QuestionView => {
    const answer = attempt.answers.find((item) => item.questionId === question.id);
    const order = attempt.optionOrders[attempt.questionIds.indexOf(question.id)];
    const hasA = answer?.partA !== undefined;
    const hasB = answer?.partB !== undefined;

    return {
      id: question.id,
      number: index + 1,
      topicId: question.topicId,
      topicTitle: topicTitle(question.topicId),
      environment: question.environment,
      ...(question.html ? { html: question.html } : {}),
      code: question.code,
      partA: { ask: question.partA.ask, ...(hasA ? { answer: answer.partA } : {}), locked: hasA },
      ...(hasA
        ? {
            partB: {
              ask: question.partB.ask,
              options: order.map((optionNumber) => question.partB.options[optionNumber]),
              ...(hasB ? { chosen: order.indexOf(answer.partB as number) } : {}),
            },
          }
        : {}),
      ...(hasB && question.partC
        ? { partC: { ask: question.partC.ask, ...(answer?.partC ? { answer: answer.partC } : {}), maxLength: PART_C_MAX } }
        : {}),
      complete: isComplete(question, answer),
    };
  });

  return {
    id,
    skillId: attempt.skillId,
    skillName: ROADMAP_SKILLS.find((skill) => skill.id === attempt.skillId)?.name ?? attempt.skillId,
    level: attempt.level,
    levelName: LEVEL_RULES[attempt.level - 1].name,
    attemptNumber: attempt.attemptNumber,
    set: attempt.set,
    total: questions.length,
    needed: LEVEL_RULES[attempt.level - 1].needed,
    reached,
    current: reached,
    startedAt: attempt.startedAt.toISOString(),
    questions: views,
  };
}
