import type { ResumeSummary } from "./types";

// the longest note a version can have (the same limit as the server)
export const MAX_NOTE = 60;

// "Resume v3" (versions are numbered by the server; there is no custom label)
export function versionTitle(resume: Pick<ResumeSummary, "versionNumber">): string {
  return `Resume v${resume.versionNumber}`;
}

// "18 Nov 2026"
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// "18 Nov, 02:20 pm"
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
