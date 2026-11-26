// The learning notes of one topic (shown under the "Learn" button on the Skills page).
// Deep notes fill every part; light notes (for less important topics) may have fewer sections, terms and examples.

export interface TopicNotes {
  topicId: string; // the id of the topic in data/roadmap.ts
  summary: string;
  explanation: { heading: string; points: string[] }[]; // short numbered points, in the order to learn them
  terms: { term: string; meaning: string }[]; // the keywords, each in one plain sentence
  examples: {
    title: string;
    environment: "node" | "browser";
    language?: "javascript" | "html" | "css" | "jsx"; // what the code is; JavaScript when left out (HTML and CSS topics use html and css, React uses jsx: one file that defines App)
    html?: string; // for a browser example: the page the code runs on (for CSS: the markup the CSS styles)
    code: string;
    walkthrough: string[]; // the code explained step by step, in running order
    output: string; // exactly what the code prints
  }[];
  keyPoints: string[]; // the facts to remember (they also become answer checklists later)
  commonMistakes: string[];
  links: { title: string; url: string; kind: "article" | "video" | "docs"; language?: string; why: string }[];
}
