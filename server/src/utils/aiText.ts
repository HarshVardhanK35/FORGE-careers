const MAX_AI_RESUME_CHARS = 12000;

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE = /\+?\d[\d\s().-]{8,}\d/g;
const LINK = /\bhttps?:\/\/\S+|\b(?:www\.)?(?:linkedin|github)\.com\/\S+/gi;

// removes contact details and cuts the text to the size the free AI limits allow
export function prepareResumeForAi(text: string): string {
  return text
    .replace(EMAIL, "[email]")
    .replace(PHONE, (match) => (match.replace(/\D/g, "").length >= 10 ? "[phone]" : match))
    .replace(LINK, "[link]")
    .slice(0, MAX_AI_RESUME_CHARS);
}
