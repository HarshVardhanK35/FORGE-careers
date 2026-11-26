// The skill roadmap: the skills in the order they open, and their topics.
// Topics are DATA: a correction here needs no change in the code.
// JavaScript (38 topics) and HTML+CSS (29 topics) have topics so far, chosen from recent interview guides and what React needs; to be checked by the user; the other skills get theirs later.
// A skill without topics shows "Topics coming soon" and keeps its tests locked.

export type Tier = "required" | "moderate" | "skippable";

export interface RoadmapTopic {
  id: string; // unique across all skills, for example "js-closures"
  title: string;
  category: string; // the group it belongs to; the list order inside the skill is the order to learn them
  priority: "must" | "common"; // must = asked almost everywhere or needed for React; common = asked often
}

export interface RoadmapSkill {
  id: string;
  name: string;
  tier: Tier;
  topics: RoadmapTopic[];
}

// the order of this list is the order the skills open (Required first, then Moderate, then Skippable)
export const ROADMAP_SKILLS: RoadmapSkill[] = [
  {
    id: "javascript",
    name: "JavaScript",
    tier: "required",
    topics: [
      { id: "js-values-types", title: "Values, types and type coercion", category: "Basics", priority: "must" },
      { id: "js-truthy-logical", title: "Truthy and falsy, logical operators and short-circuit evaluation", category: "Basics", priority: "must" },
      { id: "js-variables-scope", title: "Variables (var, let, const) and scope", category: "Basics", priority: "must" },
      { id: "js-hoisting", title: "Hoisting and the temporal dead zone", category: "Basics", priority: "must" },
      { id: "js-operators-equality", title: "Operators and equality (== and ===)", category: "Basics", priority: "must" },
      { id: "js-control-flow", title: "Control flow and loops", category: "Basics", priority: "must" },
      { id: "js-functions", title: "Functions: declarations, expressions, arrow functions, default and rest parameters", category: "Basics", priority: "must" },
      { id: "js-objects", title: "Objects and property access (shorthand and computed keys)", category: "Basics", priority: "must" },
      { id: "js-arrays", title: "Arrays and the array methods (map, filter, reduce, find, some, every, sort)", category: "Basics", priority: "must" },
      { id: "js-strings-numbers", title: "Strings, template literals and numbers", category: "Basics", priority: "common" },
      { id: "js-destructuring-spread", title: "Destructuring, spread and rest", category: "Basics", priority: "must" },
      { id: "js-optional-nullish", title: "Optional chaining and nullish coalescing", category: "Basics", priority: "must" },
      { id: "js-modules", title: "Modules (ES modules and CommonJS)", category: "Basics", priority: "must" },
      { id: "js-closures", title: "Closures (including closures in loops and stale closures)", category: "Core", priority: "must" },
      { id: "js-this-binding", title: "this, call, apply and bind (and this in arrow functions)", category: "Core", priority: "must" },
      { id: "js-prototypes", title: "Prototypes and the prototype chain", category: "Core", priority: "must" },
      { id: "js-classes", title: "Classes and inheritance", category: "Core", priority: "common" },
      { id: "js-higher-order", title: "Higher-order functions and callbacks", category: "Core", priority: "must" },
      { id: "js-currying-compose", title: "Currying and function composition", category: "Core", priority: "common" },
      { id: "js-immutability", title: "Immutability: shallow and deep copies, structuredClone, toSorted, toReversed and with", category: "Core", priority: "must" },
      { id: "js-errors", title: "Error handling (try, catch, finally, custom errors)", category: "Core", priority: "common" },
      { id: "js-json-dates-regex", title: "JSON, dates and regular expressions", category: "Core", priority: "common" },
      { id: "js-map-set", title: "Map and Set", category: "Core", priority: "common" },
      { id: "js-callbacks-promises", title: "Callbacks versus promises", category: "Async", priority: "common" },
      { id: "js-promises", title: "Promises (then, catch, finally, chaining)", category: "Async", priority: "must" },
      { id: "js-async-await", title: "async and await, with error handling", category: "Async", priority: "must" },
      { id: "js-event-loop", title: "The event loop: call stack, microtasks, macrotasks and output order", category: "Async", priority: "must" },
      { id: "js-timers", title: "Timers (setTimeout and setInterval)", category: "Async", priority: "must" },
      { id: "js-promise-combinators", title: "Promise.all, allSettled, race and any (and writing your own)", category: "Async", priority: "must" },
      { id: "js-debounce-throttle", title: "Debounce and throttle, written from scratch", category: "Async", priority: "must" },
      { id: "js-fetch-abort", title: "The Fetch API, AbortController and handling HTTP errors", category: "Async", priority: "must" },
      { id: "js-dom", title: "DOM selection and manipulation", category: "Browser", priority: "must" },
      { id: "js-dom-events", title: "Events: bubbling, capturing, delegation, preventDefault and stopPropagation", category: "Browser", priority: "must" },
      { id: "js-web-storage", title: "Web storage (localStorage and sessionStorage) and cookie basics", category: "Browser", priority: "common" },
      { id: "js-memory", title: "Memory leaks and garbage collection", category: "Browser", priority: "common" },
      { id: "js-polyfills", title: "Polyfills for map, filter, reduce and bind", category: "Coding round", priority: "must" },
      { id: "js-deep-clone-equal", title: "deepClone and deepEqual", category: "Coding round", priority: "common" },
      { id: "js-array-utilities", title: "Array and object utilities (flatten, group by, unique)", category: "Coding round", priority: "common" },
    ],
  },
  {
    id: "css", // the id stays "css" so that saved progress keeps working; the name is HTML+CSS
    name: "HTML+CSS",
    tier: "required",
    topics: [
      { id: "hc-document-structure", title: "Document structure, elements, attributes and block versus inline", category: "HTML", priority: "must" },
      { id: "hc-semantic-html", title: "Semantic HTML (header, nav, main, section, article, footer)", category: "HTML", priority: "must" },
      { id: "hc-links-images-media", title: "Links, images and media (alt text, responsive images)", category: "HTML", priority: "must" },
      { id: "hc-forms", title: "Forms and inputs (labels, input types, validation attributes, button types)", category: "HTML", priority: "must" },
      { id: "hc-lists-tables", title: "Lists and tables", category: "HTML", priority: "common" },
      { id: "hc-html-accessibility", title: "HTML accessibility basics (headings, landmarks, labels, focus order, ARIA only when needed)", category: "HTML", priority: "must" },
      { id: "hc-selectors", title: "Selectors and combinators", category: "CSS basics", priority: "must" },
      { id: "hc-cascade-specificity", title: "The cascade, specificity and inheritance", category: "CSS basics", priority: "must" },
      { id: "hc-box-model", title: "The box model and box-sizing", category: "CSS basics", priority: "must" },
      { id: "hc-units", title: "Units (px, rem, em, %, vw, vh, dvh)", category: "CSS basics", priority: "must" },
      { id: "hc-display", title: "display (block, inline, inline-block, none) and visibility", category: "CSS basics", priority: "must" },
      { id: "hc-positioning", title: "Positioning (relative, absolute, fixed, sticky)", category: "CSS basics", priority: "must" },
      { id: "hc-z-index-stacking", title: "z-index and the stacking context", category: "CSS basics", priority: "must" },
      { id: "hc-pseudo", title: "Pseudo-classes and pseudo-elements (:hover, :focus-visible, ::before)", category: "CSS basics", priority: "must" },
      { id: "hc-backgrounds-borders", title: "Backgrounds, borders, shadows and gradients", category: "CSS basics", priority: "common" },
      { id: "hc-transitions-animations", title: "Transitions and animations (including prefers-reduced-motion)", category: "CSS basics", priority: "common" },
      { id: "hc-flexbox-basics", title: "Flexbox basics and alignment", category: "Layout", priority: "must" },
      { id: "hc-flexbox-practice", title: "Flexbox in practice (grow, shrink, basis, wrap, gap)", category: "Layout", priority: "must" },
      { id: "hc-grid-basics", title: "CSS Grid basics", category: "Layout", priority: "must" },
      { id: "hc-grid-practice", title: "Grid in practice (areas, auto-fit with minmax, subgrid)", category: "Layout", priority: "must" },
      { id: "hc-layout-patterns", title: "Centering and common layout patterns (navbar, cards, holy grail)", category: "Layout", priority: "must" },
      { id: "hc-mobile-first-media", title: "Mobile-first design and media queries", category: "Responsive", priority: "must" },
      { id: "hc-fluid-sizing", title: "Fluid sizing and responsive images (clamp, aspect-ratio, object-fit, srcset)", category: "Responsive", priority: "common" },
      { id: "hc-container-queries", title: "Container queries", category: "Responsive", priority: "common" },
      { id: "hc-custom-properties", title: "Custom properties (variables) and theming, including dark mode", category: "Modern CSS", priority: "must" },
      { id: "hc-css-architecture", title: "CSS architecture and styling in React (BEM, utility-first like Tailwind, CSS Modules)", category: "Modern CSS", priority: "must" },
      { id: "hc-rendering-performance", title: "Browser rendering and CSS performance (reflow versus repaint, will-change, critical CSS)", category: "Practice", priority: "common" },
      { id: "hc-debugging-crossbrowser", title: "Debugging with DevTools and cross-browser issues", category: "Practice", priority: "must" },
      { id: "hc-css-accessibility", title: "CSS and accessibility (focus styles, contrast, hiding content for screen readers)", category: "Practice", priority: "must" },
    ],
  },
  { id: "react", name: "React", tier: "required", topics: [] },
  { id: "typescript", name: "TypeScript", tier: "required", topics: [] },
  { id: "tanstack-query", name: "TanStack Query", tier: "required", topics: [] },
  { id: "node-express", name: "Node and Express", tier: "required", topics: [] },
  { id: "rest", name: "REST", tier: "required", topics: [] },
  { id: "mongodb-mongoose", name: "MongoDB and Mongoose", tier: "required", topics: [] },
  { id: "jwt-auth", name: "JWT authentication", tier: "required", topics: [] },
  { id: "redux-toolkit", name: "Redux Toolkit", tier: "moderate", topics: [] },
  { id: "jest", name: "Jest", tier: "moderate", topics: [] },
  { id: "react-testing-library", name: "React Testing Library", tier: "moderate", topics: [] },
  { id: "accessibility", name: "Accessibility", tier: "moderate", topics: [] },
  { id: "web-performance", name: "Web performance", tier: "moderate", topics: [] },
  { id: "web-security", name: "Web security", tier: "moderate", topics: [] },
  { id: "git-github-actions", name: "Git and GitHub Actions", tier: "moderate", topics: [] },
  { id: "docker", name: "Docker", tier: "moderate", topics: [] },
  { id: "reviewing-ai-code", name: "Reviewing AI-written code", tier: "moderate", topics: [] },
  { id: "playwright", name: "Playwright", tier: "skippable", topics: [] },
  { id: "nextjs", name: "Next.js", tier: "skippable", topics: [] },
];

// the project parts (CastWise and FORGE); their study flows are added later
export interface RoadmapProject {
  id: string;
  name: string;
  flows: { id: string; title: string }[];
}

export const ROADMAP_PROJECTS: RoadmapProject[] = [
  { id: "forge-server", name: "FORGE server", flows: [] },
  { id: "forge-client", name: "FORGE client", flows: [] },
  { id: "castwise-server", name: "CastWise server", flows: [] },
  { id: "castwise-client", name: "CastWise client", flows: [] },
];
