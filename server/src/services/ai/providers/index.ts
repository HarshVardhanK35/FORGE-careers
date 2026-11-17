import { callGroq, ProviderRequest, ProviderResult } from "./groq";

export type ProviderFunction = (req: ProviderRequest) => Promise<ProviderResult>;

// add another provider here later, for example openrouter
export const PROVIDERS: Record<string, ProviderFunction> = {
  groq: callGroq,
};
