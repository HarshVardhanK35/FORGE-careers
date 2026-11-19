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

// one resume version in the list (GET /resumes leaves the text out)
export interface ResumeSummary {
  _id: string;
  versionNumber: number;
  note: string;
  isCurrent: boolean;
  createdAt: string;
}

// one resume version with its text (GET /resumes/:id)
export interface Resume extends ResumeSummary {
  text: string;
}

// what the new-version form sends to POST /resumes
export interface NewResumeInput {
  text: string;
  note: string; // required, up to 60 characters; the server names the version v1, v2, v3 ...
}

export type Severity = "high" | "medium" | "low";

export interface ResumeIssue {
  section: string;
  problem: string;
  suggestion: string;
  severity: Severity;
}

// one AI check of a resume version (POST /resume-checks, GET /resume-checks?resumeId=)
export interface ResumeCheck {
  _id: string;
  resumeId: string;
  provider: string;
  model: string;
  targetRole: string;
  summary: string;
  strengths: string[];
  issues: ResumeIssue[];
  keywordGaps: string[];
  createdAt: string;
}

// what the onboarding form sends to PUT /profile
export interface ProfileInput {
  name: string;
  yearsOfExperience?: number;
  hoursPerDay: number;
}
