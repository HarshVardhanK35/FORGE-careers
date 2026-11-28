import { z } from "zod";

import { allNotes, getNotes, hasNotes } from "../src/data/content";
import { ROADMAP_SKILLS } from "../src/data/roadmap";
import { buildView, emptyProgress } from "../src/services/roadmap/rules";

// the shape every notes entry must have (a light entry may have fewer sections, terms and examples)
const notesSchema = z.object({
  topicId: z.string().min(1),
  summary: z.string().min(10),
  syntax: z
    .array(
      z.object({
        title: z.string().min(1),
        language: z.enum(["javascript", "jsx", "html", "css"]),
        code: z.string().min(3),
        parts: z.array(z.object({ part: z.string().min(1), meaning: z.string().min(5) })).min(1),
      })
    )
    .min(1)
    .max(3)
    .optional(),
  explanation: z.array(z.object({ heading: z.string().min(1), points: z.array(z.string().min(5)).min(1) })).min(1),
  terms: z.array(z.object({ term: z.string().min(1), meaning: z.string().min(5) })),
  examples: z
    .array(
      z.object({
        title: z.string().min(1),
        environment: z.enum(["node", "browser"]),
        language: z.enum(["javascript", "html", "css", "jsx"]).optional(),
        html: z.string().optional(),
        code: z.string().min(1),
        walkthrough: z.array(z.string().min(3)).min(1),
        output: z.string(),
      })
    )
    .min(1),
  keyPoints: z.array(z.string().min(3)).min(1),
  commonMistakes: z.array(z.string().min(3)),
  links: z.array(z.object({ title: z.string(), url: z.string().url(), kind: z.enum(["article", "video", "docs"]), why: z.string() }).passthrough()),
});

const topicIds = ROADMAP_SKILLS.flatMap((skill) => skill.topics.map((topic) => topic.id));

describe("topic notes", () => {
  it("has a valid shape for every entry", () => {
    for (const notes of allNotes()) {
      const result = notesSchema.safeParse(notes);
      if (!result.success) throw new Error(`${notes.topicId}: ${result.error.message}`);
    }
  });

  it("belongs to a real topic, once", () => {
    const ids = allNotes().map((notes) => notes.topicId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(topicIds).toContain(id);
  });

  it("covers every JavaScript topic", () => {
    const javascript = ROADMAP_SKILLS.find((skill) => skill.id === "javascript");
    for (const topic of javascript?.topics ?? []) expect(hasNotes(topic.id)).toBe(true);
  });

  it("covers every HTML+CSS topic", () => {
    const htmlCss = ROADMAP_SKILLS.find((skill) => skill.id === "css");
    expect(htmlCss?.topics.length).toBe(29);
    for (const topic of htmlCss?.topics ?? []) expect(hasNotes(topic.id)).toBe(true);
  });

  it("covers every React topic, with a defined App in every example", () => {
    const react = ROADMAP_SKILLS.find((skill) => skill.id === "react");
    expect(react?.topics.length).toBe(30);
    for (const topic of react?.topics ?? []) {
      expect(hasNotes(topic.id)).toBe(true);
      for (const example of getNotes(topic.id)?.examples ?? []) {
        expect(example.language).toBe("jsx");
        expect(example.code).toMatch(/function App|const App/);
      }
    }
  });

  it("gives a browser example the page it runs on (except an HTML example, which is the page)", () => {
    for (const notes of allNotes()) {
      for (const example of notes.examples) {
        // an HTML example is the page itself and a React example is one file that defines App; every other browser example needs its page
        if (example.environment === "browser" && example.language !== "html" && example.language !== "jsx") expect(example.html).toBeTruthy();
      }
    }
  });

  it("links only to written pages, never to MDN or a video", () => {
    for (const notes of allNotes()) {
      for (const link of notes.links) {
        expect(link.kind).toBe("article");
        expect(link.url).not.toContain("developer.mozilla.org");
      }
    }
  });

  it("is found by topic id", () => {
    expect(getNotes("js-closures")?.topicId).toBe("js-closures");
    expect(getNotes("nope")).toBeUndefined();
  });

  it("tells the roadmap which topics have notes", () => {
    const view = buildView(emptyProgress(), new Date());
    expect(view.skills[0].topics.every((topic) => topic.hasNotes)).toBe(true);
  });
});
