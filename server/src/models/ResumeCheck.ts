import { Schema, model, Types } from "mongoose";

export const SEVERITIES = ["high", "medium", "low"] as const;

export interface IIssue {
  section: string;
  problem: string;
  suggestion: string;
  severity: (typeof SEVERITIES)[number];
}

export interface IResumeCheck {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;
  provider: string;
  model: string;
  targetRole: string;
  summary: string;
  strengths: string[];
  issues: IIssue[];
  keywordGaps: string[];
}

const resumeCheckSchema = new Schema<IResumeCheck>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },
    provider: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    targetRole: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    strengths: {
      type: [String],
      default: []
    },
    issues: [
      {
        _id: false,
        section: {
          type: String,
          required: true
        },
        problem: {
          type: String,
          required: true
        },
        suggestion: {
          type: String,
          required: true
        },
        severity: {
          type: String,
          enum: SEVERITIES,
          required: true
        },
      },
    ],
    keywordGaps: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

resumeCheckSchema.index({
  userId: 1,
  resumeId: 1,
  createdAt: -1
});

export const ResumeCheck = model<IResumeCheck>("ResumeCheck", resumeCheckSchema);

// One document per check, linked to the version by resumeId. 
// It holds the AI's feedback and which model produced it, 
//    so a weak result can be rerun on another model.

