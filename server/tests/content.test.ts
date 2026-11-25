import { z } from "zod";

import { allNotes, getNotes, hasNotes } from "../src/data/content";
import { ROADMAP_SKILLS } from "../src/data/roadmap";
import { buildView, emptyProgress } from "../src/services/roadmap/rules";

// the shape every notes entry must have (a light entry may have fewer sections, terms and examples)
const notesSchema = z.object({
  topicId: z.string().min(1),
  summary: z.string().min(10),
  explanation: z.array(z.object({ heading: z.string().min(1), points: z.array(z.string().min(5)).min(1) })).min(1),
  terms: z.array(z.object({ term: z.string().min(1), meaning: z.string().min(5) })),
  examples: z
    .array(
      z.object({
        title: z.string().min(1),
        environment: z.enum(["node", "browser"]),
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

  it("gives a browser example the page it runs on", () => {
    for (const notes of allNotes()) {
      for (const example of notes.examples) {
        if (example.environment === "browser") expect(example.html).toBeTruthy();
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
