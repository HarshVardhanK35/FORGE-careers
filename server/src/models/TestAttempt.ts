import { Schema, model, Types } from "mongoose";

// One try at a level's test. It is saved answer by answer, so he can continue after a break;
// it counts as an attempt only when he finishes it.

export interface IAnswer {
  questionId: string;
  partA?: string;
  partB?: number;
  partC?: string;
  partAAt?: Date;
  partBAt?: Date;
  partCAt?: Date;
}

export interface ITestResult {
  points: number; // in questions' worth, for example 18.83
  total: number;
  needed: number;
  passed: boolean;
  scorePercent: number;
  timeMs: number; // from the start to the finish
  activeMs: number; // without the long pauses
  partCCovered: { questionId: string; covered: number[] }[]; // the key points the AI found, kept for his later corrections
}

export interface ITestAttempt {
  userId: Types.ObjectId;
  skillId: string;
  level: number;
  attemptNumber: number;
  set: number | null;
  questionIds: string[];
  optionOrders: number[][];
  answers: IAnswer[];
  status: "in_progress" | "finished";
  startedAt: Date;
  finishedAt?: Date;
  result?: ITestResult;
}

const testAttemptSchema = new Schema<ITestAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    skillId: { type: String, required: true },
    level: { type: Number, enum: [1, 2, 3], required: true },
    attemptNumber: { type: Number, required: true, min: 1 },
    set: { type: Number, default: null },
    questionIds: { type: [String], required: true },
    optionOrders: { type: [[Number]], required: true },
    answers: [
      {
        _id: false,
        questionId: { type: String, required: true },
        partA: { type: String, maxlength: 300 },
        partB: { type: Number, min: 0, max: 3 },
        partC: { type: String, maxlength: 600 },
        partAAt: Date,
        partBAt: Date,
        partCAt: Date,
      },
    ],
    status: { type: String, enum: ["in_progress", "finished"], default: "in_progress" },
    startedAt: { type: Date, default: Date.now },
    finishedAt: Date,
    result: {
      points: Number,
      total: Number,
      needed: Number,
      passed: Boolean,
      scorePercent: Number,
      timeMs: Number,
      activeMs: Number,
      partCCovered: [{ _id: false, questionId: String, covered: [Number] }],
    },
  },
  { timestamps: true }
);

// only one unfinished test per level at a time (a double click cannot start two)
testAttemptSchema.index(
  { userId: 1, skillId: 1, level: 1 },
  { unique: true, partialFilterExpression: { status: "in_progress" } }
);

export const TestAttempt = model<ITestAttempt>("TestAttempt", testAttemptSchema);

/**
 * Only what he did is stored: the questions chosen for the attempt, the order each question's options are shown in
 * (so the screen is the same after a break), his answers with the time of each, and, after Finish, the result.
 * The correct answers are never stored here and never sent to the screen: they stay in the question data.
 */
