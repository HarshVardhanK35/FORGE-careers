import { z } from "zod";

const skillList = z.array(z.string().trim().min(1).max(80)).max(60);

export const pastedAnswerSchema = z.object({
  requiredSkills: skillList,
  niceToHaveSkills: skillList,
  resumeSkills: z.array(z.string().trim().min(1).max(80)).max(120),
  yearsRequired: z.number().min(0).max(40).nullable().optional(),
});

export type PastedAnswer = z.infer<typeof pastedAnswerSchema>;

export type AnswerResult = { ok: true; data: PastedAnswer } | { ok: false; message: string };

// checks an already-parsed object
export function checkAnswer(value: unknown): AnswerResult {
  const parsed = pastedAnswerSchema.safeParse(value);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => i.path.join(".") || "answer"))];
    return { ok: false, message: `The answer is missing or wrong in: ${fields.join(", ")}` };
  }
  return { ok: true, data: parsed.data };
}

// takes text pasted from a chat: removes code fences and words around the braces
export function parseAnswerText(text: string): AnswerResult {
  const cleaned = text.replace(/```(?:json)?/gi, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) {
    return { ok: false, message: "No JSON object found in the answer" };
  }

  let json: unknown;
  try {
    json = JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return { ok: false, message: "The answer is not valid JSON" };
  }

  return checkAnswer(json);
}
