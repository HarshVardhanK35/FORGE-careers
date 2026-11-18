// The shapes of what the server sends and expects.
// They are written by hand to match the server; the app does not check them while running.

export interface Profile {
  name: string;
  targetRole: string;
  yearsOfExperience: number;
  hoursPerDay: number;
}

export type Bucket = "primary" | "secondary" | "later";
export type Layer = "technical" | "professional";

// one skill as GET /onboarding sends it
export interface OnboardingSkill {
  skillId: string;
  name: string;
  description: string;
  layer: Layer;
  category: string;
  order: number;
  suggestedBucket: Bucket;
  tag: "P" | "S" | null; // the suggested level, shown on a skill that sits in Later
  recommended: boolean;
  bucket: Bucket; // the current choice (or the preselection before onboarding)
}

export interface Category {
  id: string;
  label: string;
}

// how many skills fill each focus slot
export interface FocusCounts {
  technicalPrimary: number;
  technicalSecondary: number;
  professional: number;
}

export type FocusLimits = FocusCounts;

export interface OnboardingData {
  onboardingComplete: boolean;
  categories: Category[];
  focus: {
    counts: FocusCounts;
    limits: FocusLimits;
    minimumTechnicalPrimary: number;
  };
  skills: OnboardingSkill[];
}

// what the onboarding form sends to PUT /profile
export interface ProfileInput {
  name: string;
  yearsOfExperience?: number;
  hoursPerDay: number;
}
