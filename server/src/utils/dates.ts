const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// today's date in India time, like "2026-11-17"
export function todayKeyIst(): string {
  return new Date(Date.now() + IST_OFFSET_MS).toISOString().slice(0, 10);
}
