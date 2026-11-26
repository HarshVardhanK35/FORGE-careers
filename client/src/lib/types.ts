// The shapes of what the server sends and expects.
// They are written by hand to match the server; the app does not check them while running.

// one period without work (months are 1 to 12)
export interface CareerGap {
  text: string;
  fromMonth: number;
  fromYear: number;
  toMonth: number;
  toYear: number;
}

export interface Profile {
  name: string;
  targetRole: string;
  yearsOfExperience: number; // years and months together, for example 2.75
  hoursPerDay: number;
  careerGaps: CareerGap[];
}

// what GET /settings sends
export interface Settings {
  applyThreshold: number;
  dailyApplicationGoal: number;
  dailyAiCallCap: number;
  aiModel: string;
  aiUsedToday: number; // AI calls made today
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

// one job in the list (GET /jobs leaves the description out)
export interface JobSummary {
  _id: string;
  company: string;
  title: string;
  source: string;
  link: string;
  note: string;
  location: string;
  salaryRange: string;
  createdAt: string;
}

// one job with its description (GET /jobs/:id)
export interface Job extends JobSummary {
  description: string;
}

// what the job form sends to POST /jobs and PATCH /jobs/:id
export interface JobInput {
  company: string;
  title: string;
  source: string;
  link: string;
  location: string;
  salaryRange: string;
  description: string;
  note: string;
}

// the answer of POST /jobs: the saved job, and whether the same company and title existed already
export interface SavedJob {
  job: Job;
  duplicate: boolean;
}

// the answer of POST /job-matches/prompt: the text to paste into ChatGPT or Claude
export interface MatchPrompt {
  prompt: string;
  resumeVersion: number;
}

// one match of a job with a resume version (POST /job-matches, GET /job-matches?jobId=)
export interface JobMatch {
  _id: string;
  jobId: string;
  resumeId: string;
  source: string;
  matchedRequired: string[];
  missingRequired: string[];
  matchedNiceToHave: string[];
  missingNiceToHave: string[];
  percent: number;
  decision: "apply" | "skip";
  threshold: number;
  yearsNote: string;
  createdAt: string;
}

export type Stage =
  | "applied"
  | "response_received"
  | "shortlisted"
  | "interviewing"
  | "hold"
  | "rejected"
  | "succeeded";

export type RoundType = "technical" | "hr" | "managerial" | "other";
export type RoundResult = "pending" | "passed" | "failed";

// one application in the list (GET /applications); the job is filled in by the server
export interface ApplicationSummary {
  _id: string;
  jobId: { _id: string; company: string; title: string; location: string };
  stage: Stage;
  appliedAt: string;
  followUpDate?: string;
}

// one item of GET /applications/follow-ups (the job has only a company and a title here)
export interface FollowUp {
  _id: string;
  jobId: { _id: string; company: string; title: string };
  stage: Stage;
  followUpDate?: string;
}

// one interview round of an application
export interface Round {
  _id: string;
  number: number;
  date: string;
  type: RoundType;
  notes: string;
  result: RoundResult;
  feedback: string;
}

// one entry of the stage history: the stage, and the day it was reached
export interface StageChange {
  stage: Stage;
  date: string;
}

// one application with everything (GET /applications/:id); the job and the resume version are filled in
export interface ApplicationDetail {
  _id: string;
  jobId: Job;
  resumeId: { _id: string; versionNumber: number } | null;
  stage: Stage;
  appliedAt: string;
  followUpDate?: string;
  history: StageChange[];
  rounds: Round[];
}

// the counts of GET /applications/stats
export interface ApplicationStats {
  total: number;
  today: number;
  perStage: Record<Stage, number>;
  perDay: { date: string; count: number }[];
}

// what the round form sends to POST and PATCH /applications/:id/rounds
export interface RoundInput {
  date: string; // for example 2026-11-23
  type: RoundType;
  notes: string;
  result?: RoundResult; // only when a round is edited
  feedback?: string; // only when a round is edited
}

// what the onboarding form sends to PUT /profile
export interface ProfileInput {
  name: string;
  yearsOfExperience?: number;
  hoursPerDay: number;
}

// ---- the skill roadmap (what GET /roadmap sends) ----

export type SkillTier = "required" | "moderate" | "skippable";
export type LevelState = "locked" | "open" | "waiting" | "passed" | "skipped";

export interface RoadmapTopic {
  id: string;
  title: string;
  category: string;
  priority: "must" | "common";
  hasNotes: boolean; // true when the Learn button has notes to show
  done: boolean;
  resource: string; // his own link or note; empty at first
}

export interface RoadmapLevel {
  level: 1 | 2 | 3;
  name: string;
  state: LevelState;
  reason: string; // why it cannot be taken yet
  canTake: boolean;
  attempts: number;
  bestScore: number | null;
  nextAttemptAt: string | null; // when the wait after a failed attempt ends
  attemptSet: number | null; // 1 to 3 = a fixed set; null = random questions
  passMark: number;
  needed: number;
  total: number;
  waitHours: number; // the wait after a failed attempt
}

export interface RoadmapSkill {
  id: string;
  name: string;
  tier: SkillTier;
  order: number;
  unlocked: boolean;
  topicsDone: number;
  topicsTotal: number;
  topics: RoadmapTopic[];
  levels: RoadmapLevel[];
}

export interface RoadmapProject {
  id: string;
  name: string;
  flowsStudied: number;
  flowsTotal: number;
  ready: boolean;
}

export interface Roadmap {
  skills: RoadmapSkill[];
  projects: RoadmapProject[];
}

// ---- the learning notes of one topic (what GET /roadmap/topics/:id/learn sends) ----

export interface TopicNotes {
  topicId: string;
  summary: string;
  explanation: { heading: string; points: string[] }[];
  terms: { term: string; meaning: string }[];
  examples: {
    title: string;
    environment: "node" | "browser";
    language?: "javascript" | "html" | "css" | "jsx"; // what the code is; JavaScript when left out
    html?: string; // for a browser example: the page the code runs on (for CSS: the markup the CSS styles)
    code: string;
    walkthrough: string[];
    output: string; // what it prints, or for HTML and CSS what the browser shows, in words
  }[];
  keyPoints: string[];
  commonMistakes: string[];
  links: { title: string; url: string; kind: "article" | "video" | "docs"; why: string }[];
}

// ---- a level test (what the /tests routes send) ----

export interface TestQuestion {
  id: string;
  number: number;
  topicId: string;
  topicTitle: string;
  environment: "node" | "browser" | "page"; // page: the code is a small HTML and CSS page
  html?: string; // for a browser question: the page the code runs on
  code: string;
  partA: { ask: string; answer?: string; locked: boolean };
  partB?: { ask: string; options: string[]; chosen?: number }; // appears after Part A is saved
  partC?: { ask: string; answer?: string; maxLength: number }; // appears after Part B is chosen
  complete: boolean;
}

export interface TestAttempt {
  id: string;
  skillId: string;
  skillName: string;
  level: number;
  levelName: string;
  attemptNumber: number;
  total: number;
  needed: number;
  reached: number; // how many questions are open
  current: number; // the question to show first
  startedAt: string;
  questions: TestQuestion[]; // only the reached ones
}

export interface TestResult {
  passed: boolean;
  points: number;
  total: number;
  needed: number;
  scorePercent: number;
  timeMs: number;
  activeMs: number;
  waitHours: number | null;
  nextAttemptAt: string | null;
  nextLevelOpen: boolean;
}
