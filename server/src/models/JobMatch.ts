import { Schema, model, Types } from "mongoose";

export const DECISIONS = ["apply", "skip"] as const;

export interface IJobMatch {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  resumeId: Types.ObjectId;
  source: string;
  method: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  resumeSkills: string[];
  yearsRequired: number | null;
  matchedRequired: string[];
  matchedNiceToHave: string[];
  missingRequired: string[];
  missingNiceToHave: string[];
  earnedPoints: number;
  totalPoints: number;
  percent: number;
  decision: (typeof DECISIONS)[number];
  threshold: number;
  yearsNote: string;
}

const jobMatchSchema = new Schema<IJobMatch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },
    source: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    method: {
      type: String,
      required: true
    },
    requiredSkills: {
      type: [String],
      default: []
    },
    niceToHaveSkills: {
      type: [String],
      default: []
    },
    resumeSkills: {
      type: [String],
      default: []
    },
    yearsRequired: {
      type: Number,
      default: null
    },
    matchedRequired: {
      type: [String],
      default: []
    },
    matchedNiceToHave: {
      type: [String],
      default: []
    },
    missingRequired: {
      type: [String],
      default: []
    },
    missingNiceToHave: {
      type: [String],
      default: []
    },
    earnedPoints: {
      type: Number,
      required: true
    },
    totalPoints: {
      type: Number,
      required: true
    },
    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    decision: {
      type: String,
      enum: DECISIONS,
      required: true
    },
    threshold: {
      type: Number,
      required: true
    },
    yearsNote: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

jobMatchSchema.index({
  userId: 1,
  jobId: 1,
  createdAt: -1
});

export const JobMatch = model<IJobMatch>("JobMatch", jobMatchSchema);
