export const AI_TASKS = ["resumeCheck", "jobMatch", "answerFeedback"] as const;
export type AiTask = (typeof AI_TASKS)[number];

export interface ModelChoice {
  provider: string;
  model: string;
}

const GPT_OSS_120B: ModelChoice = { provider: "groq", model: "openai/gpt-oss-120b" };
const GPT_OSS_20B: ModelChoice = { provider: "groq", model: "openai/gpt-oss-20b" };
const QWEN_27B: ModelChoice = { provider: "groq", model: "qwen/qwen3.8-27b" };

// the recommended models for each task, in the order they are tried
export const DEFAULT_MODELS: Record<AiTask, ModelChoice[]> = {
  resumeCheck: [GPT_OSS_120B, GPT_OSS_20B, QWEN_27B],
  jobMatch: [GPT_OSS_20B, GPT_OSS_120B, QWEN_27B],
  answerFeedback: [GPT_OSS_120B, GPT_OSS_20B, QWEN_27B],
};
