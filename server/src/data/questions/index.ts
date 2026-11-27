// All question banks, found by skill and level. A new bank (another level or skill) is added to the list below.

import { HTML_CSS_LEVEL_1 } from "./html-css-l1";
import { JAVASCRIPT_LEVEL_1 } from "./javascript-l1";
import { JAVASCRIPT_LEVEL_2 } from "./javascript-l2";
import { JAVASCRIPT_LEVEL_3 } from "./javascript-l3";
import { REACT_LEVEL_1 } from "./react-l1";
import type { Question, QuestionBank } from "./types";

const BANKS: QuestionBank[] = [JAVASCRIPT_LEVEL_1, JAVASCRIPT_LEVEL_2, JAVASCRIPT_LEVEL_3, HTML_CSS_LEVEL_1, REACT_LEVEL_1];

export function getQuestionBank(skillId: string, level: number): QuestionBank | undefined {
  return BANKS.find((bank) => bank.skillId === skillId && bank.level === level);
}

// one question by its id, in the bank of a skill and level
export function getQuestion(skillId: string, level: number, questionId: string): Question | undefined {
  return getQuestionBank(skillId, level)?.questions.find((question) => question.id === questionId);
}

export function allBanks(): QuestionBank[] {
  return BANKS;
}
