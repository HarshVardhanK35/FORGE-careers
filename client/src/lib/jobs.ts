// A saved link is shown as a link only when it starts with http or https.
// (A text such as "javascript:..." must never become a clickable link.)
export function safeLink(link: string): string | null {
  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

// The longest text each field accepts (the same numbers as the server).
// The short caps keep a row of the list on one or two lines.
export const JOB_LIMITS = {
  company: 50,
  title: 60,
  source: 25,
  location: 30,
  salaryRange: 10,
  link: 500,
  note: 100,
  description: 20000,
};
