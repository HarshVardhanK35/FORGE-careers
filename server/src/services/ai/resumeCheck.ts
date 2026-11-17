import { z } from "zod";

import { SEVERITIES } from "../../models/ResumeCheck";

const issueSchema = z.object({
  section: z.string().max(120),
  problem: z.string().max(600),
  suggestion: z.string().max(800),
  severity: z.enum(SEVERITIES),
});

// the shape the AI must answer with, checked on every call
export const resumeCheckSchema = z.object({
  summary: z.string().max(900),
  strengths: z.array(z.string().max(400)).max(5),
  issues: z.array(issueSchema).max(8),
  keywordGaps: z.array(z.string().max(80)).max(10),
});

export function buildResumeCheckPrompt(targetRole: string, resumeText: string) {
  const system = [
    "You are a careful, honest resume reviewer.",
    "Review the resume for the target role the user gives you.",
    "Rules:",
    "- Use only what is written in the resume.",
    "- Never suggest adding experience, skills, employers, dates, numbers or achievements that are not already there. Suggest only clearer wording, better structure and better ordering of what exists.",
    "- If the resume has very little content, say so plainly. Do not suggest inventing sections, projects or experience; say only which kind of real information would help if the user has it.",
    "- Point out claims that have no supporting detail, so the user can add real detail if it exists.",
    "- Contact details were replaced by [email], [phone] and [link]. Ignore them.",
    "- Be specific and short.",
    "Reply with JSON only, in exactly this shape:",
    '{"summary": "2 to 4 sentences", "strengths": ["up to 5 short points"], "issues": [{"section": "which part of the resume", "problem": "what is weak", "suggestion": "how to improve it truthfully", "severity": "high or medium or low"}], "keywordGaps": ["up to 10 skills or terms the role usually expects that the resume does not mention; for the user to learn, or to add only if true"]}',
  ].join("\n");

  const user = `Target role: ${targetRole}\n\nResume:\n${resumeText}`;

  return { system, user };
}
