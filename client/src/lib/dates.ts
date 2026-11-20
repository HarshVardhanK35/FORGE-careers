// "18 Nov 2026"
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// "18 Nov"
export function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// The day in India as 2026-11-23, for a date field and for comparing days.
// (The server counts days in the India time zone too.)
export function istDateKey(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

// true when a follow-up date is today or earlier
export function isDue(followUpDate?: string): boolean {
  if (!followUpDate) return false;
  return istDateKey(followUpDate) <= istDateKey(new Date().toISOString());
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
