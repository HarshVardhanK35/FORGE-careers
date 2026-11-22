import { ZodType } from "zod";

import { Settings } from "../../models/Settings";

import { AiFailure, aiFailure, isAiFailure } from "./errors";
import { AiTask, ModelChoice, DEFAULT_MODELS } from "./tasks";
import { PROVIDERS } from "./providers";
import { reserveCall } from "./usage";

export interface CallAiOptions<T> {
  userId: string;
  task: AiTask;
  system: string;
  user: string;
  schema: ZodType<T>;
  maxTokens?: number;
}

// T for generic type 
export interface CallAiResult<T> {
  data: T;
  provider: string;
  model: string;
}

const DEFAULT_DAILY_CAP = 50;
const MAX_WAIT_SECONDS = 20;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// logs only what is safe: never the prompt and never the answer
function logCall(
  task: AiTask,
  choice: ModelChoice,
  status: string,
  startedAt: number,
  tokens: number | null
) {
  console.log(
    JSON.stringify({
      ai: { task, provider: choice.provider, model: choice.model, status, ms: Date.now() - startedAt, tokens },
    })
  );
}

export async function callAi<T>(options: CallAiOptions<T>): Promise<CallAiResult<T>> {
  const settings = await Settings.findOne({ userId: options.userId });
  const cap = settings?.dailyAiCallCap ?? DEFAULT_DAILY_CAP;
  const override = settings?.modelOverrides?.[options.task];

  // the model chosen in Settings goes first, then the recommended ones (each model once)
  const wanted: ModelChoice[] = [
    ...(override ? [{ provider: override.provider, model: override.model }] : []),
    ...(settings?.aiModel ? [{ provider: "groq", model: settings.aiModel }] : []),
    ...DEFAULT_MODELS[options.task],
  ];
  const candidates = wanted.filter(
    (choice, index) => wanted.findIndex((other) => other.model === choice.model) === index
  );

  await reserveCall(options.userId, cap);

  let lastError: AiFailure | null = null;

  for (const choice of candidates) {
    const provider = PROVIDERS[choice.provider];
    if (!provider) continue;

    for (let attempt = 1; attempt <= 2; attempt++) {
      const startedAt = Date.now();
      try {
        const result = await provider({
          model: choice.model,
          system: options.system,
          user: options.user,
          maxTokens: options.maxTokens ?? 1500,
        });

        let json: unknown;
        try {
          json = JSON.parse(result.text);
        } catch {
          throw aiFailure("invalid_output", "The answer was not JSON");
        }

        const parsed = options.schema.safeParse(json);
        if (!parsed.success) {
          throw aiFailure("invalid_output", "The answer did not have the expected shape");
        }

        logCall(options.task, choice, "ok", startedAt, result.totalTokens);
        return { data: parsed.data, provider: choice.provider, model: choice.model };
      } catch (error) {
        const failure = isAiFailure(error) ? error : aiFailure("server", "Unexpected AI error");
        logCall(options.task, choice, failure.kind, startedAt, null);
        lastError = failure;

        // a bad key will not get better by trying another model
        if (failure.kind === "auth") throw failure;

        // one retry on the same model for a bad answer
        if (failure.kind === "invalid_output" && attempt === 1) continue;

        // a short rate limit: wait, then try the same model once more
        if (
          failure.kind === "rate_limit" &&
          attempt === 1 &&
          failure.retryAfterSeconds !== undefined &&
          failure.retryAfterSeconds <= MAX_WAIT_SECONDS
        ) {
          await sleep(failure.retryAfterSeconds * 1000);
          continue;
        }

        break; // go to the next model
      }
    }
  }

  throw lastError ?? aiFailure("no_provider", "No AI provider is available");
}
