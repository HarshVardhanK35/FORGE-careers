// A test question: one short code snippet with up to three parts.
// Part A: what does it print (typed; the code compares it with the accepted answers).
// Part B: which statement explains why (one of four; the code checks the choice).
// Part C (only on some questions): explain it in his own words (marked by the AI against the key points).

export interface Question {
  id: string; // for example "js-closures-l1-s1-q14"
  topicId: string; // the topic in data/roadmap.ts the question belongs to (a wrong answer can point to its notes)
  set: number; // 1 to 3
  // node: a JavaScript snippet; browser: a snippet that runs on `html`; page: `code` is a small HTML and CSS page;
  // react: `code` is one file of React code that defines App
  environment: "node" | "browser" | "page" | "react";
  html?: string; // for a browser question: the page the code runs on
  code: string;
  check?: string; // for a page or react question: a JavaScript expression that is run on the page (a real browser at 800 x 600) or on the rendered component (jsdom) to get the answer; never sent to the screen
  partA: { ask: string; accepted: string[] };
  partB: { ask: string; options: string[]; correct: number };
  partC?: { ask: string; keyPoints: string[]; modelAnswer: string };
}

// all the questions of one level of one skill
export interface QuestionBank {
  skillId: string;
  level: 1 | 2 | 3;
  questions: Question[];
}
