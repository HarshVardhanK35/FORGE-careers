export type AiErrorKind =
  | "auth"
  | "rate_limit"
  | "server"
  | "invalid_output"
  | "cap_reached"
  | "no_provider";

export interface AiFailure {
  kind: AiErrorKind;
  message: string;
  retryAfterSeconds?: number;
}

// builds a plain failure object
export function aiFailure(kind: AiErrorKind, message: string, retryAfterSeconds?: number): AiFailure {
  return { kind, message, retryAfterSeconds };
}

// true when a caught value is one of our failure objects
export function isAiFailure(value: unknown): value is AiFailure {
  return typeof value === "object" && value !== null && "kind" in value && "message" in value;
}

// the HTTP status to answer with for an AI failure
export function statusForAiFailure(failure: AiFailure): number {
  return failure.kind === "cap_reached" ? 429 : 502;
}
