import { GROQ_API_KEY } from "../../../config/env";

import { aiFailure } from "../errors";

export interface ProviderRequest {
  model: string;
  system: string;
  user: string;
  maxTokens: number;
}

export interface ProviderResult {
  text: string;
  totalTokens: number | null;
}

export async function callGroq(req: ProviderRequest): Promise<ProviderResult> {
  let response: Response;
  try {
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: req.model,
        messages: [
          { role: "system", content: req.system },
          { role: "user", content: req.user },
        ],
        // why temperature? More consistent and focused responses. 
        // Suitable for structured JSON, classification, extraction, and analysis.
        temperature: 0.2,
        max_completion_tokens: req.maxTokens,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(45000),
    });
  } catch {
    throw aiFailure("server", "Groq did not answer in time");
  }

  if (response.status === 401 || response.status === 403) {
    throw aiFailure("auth", "Groq rejected the API key");
  }
  if (response.status === 429) {
    const retryAfter = Number(response.headers.get("retry-after"));
    throw aiFailure(
      "rate_limit",
      "Groq rate limit reached",
      Number.isFinite(retryAfter) ? retryAfter : undefined
    );
  }
  if (!response.ok) {
    let detail = "";
    try {
      const body = (await response.json()) as { error?: { message?: string } };
      detail = (body.error?.message ?? "").slice(0, 200);
    } catch {
      // no readable body
    }
    throw aiFailure("server", `Groq error ${response.status} ${detail}`.trim());
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
    usage?: { total_tokens?: number };
  };
  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw aiFailure("invalid_output", "Groq returned an empty answer");
  }

  return { text, totalTokens: data.usage?.total_tokens ?? null };
}
