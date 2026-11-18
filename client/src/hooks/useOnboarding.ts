import { useQuery } from "@tanstack/react-query";

import { api } from "../lib/api";
import type { OnboardingData } from "../lib/types";

// The skills catalog with the user's choices, and whether onboarding is complete.
// Every place that calls this hook shares the same cached answer (the key ["onboarding"]).
export function useOnboarding() {
  return useQuery({
    queryKey: ["onboarding"],
    queryFn: () => api.get<OnboardingData>("/onboarding"),
  });
}
