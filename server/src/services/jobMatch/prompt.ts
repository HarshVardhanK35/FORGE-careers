const MAX_JOB_CHARS = 12000;

export function buildMatchPrompt(input: {
  title: string;
  company: string;
  description: string;
  resumeText: string;
}): string {
  return [
    "You are helping me decide whether to apply for a job. Compare the job description with my resume.",
    "",
    "Rules:",
    "- Use only what is written in the two texts below. Do not guess and do not add skills.",
    "- requiredSkills: the technical skills, tools and technologies the job description requires.",
    "- niceToHaveSkills: the ones it lists as preferred, a plus, nice to have or a bonus.",
    "- resumeSkills: the technical skills, tools and technologies my resume shows, either listed or clearly used in its work or projects.",
    "- Use standard names, for example React, Node.js, MongoDB, TypeScript, REST APIs, CI/CD.",
    "- yearsRequired: the minimum years of experience the job asks for, as a number, or null if it does not say.",
    "- Do not include soft skills.",
    "",
    "Reply with JSON only (no explanation and no markdown), in exactly this shape:",
    '{"requiredSkills": ["..."], "niceToHaveSkills": ["..."], "resumeSkills": ["..."], "yearsRequired": null}',
    "",
    `JOB: ${input.title} at ${input.company}`,
    "JOB DESCRIPTION:",
    input.description.slice(0, MAX_JOB_CHARS),
    "",
    "MY RESUME:",
    input.resumeText,
  ].join("\n");
}
