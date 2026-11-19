import type { ResumeSummary } from "./types";

// the longest note a version can have (the same limit as the server)
export const MAX_NOTE = 60;

// "Resume v3" (versions are numbered by the server; there is no custom label)
export function versionTitle(resume: Pick<ResumeSummary, "versionNumber">): string {
  return `Resume v${resume.versionNumber}`;
}
