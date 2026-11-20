import { Schema, model, Types } from "mongoose";

// treat the array as a readonly tuple with exact literal types - readonly
// as const prevents the array values from being modified 
//    and preserves their exact string literal types instead of widening them to string
export const STAGES = [
  "applied",
  "response_received",
  "shortlisted",
  "interviewing",
  "hold",
  "rejected",
  "succeeded",
] as const;

// (typeof STAGES): gets the type of the STAGES array
// [number]: extracts the type of all elements inside the array
// together - creates a union of all possible array values
export type Stage = (typeof STAGES)[number];

export const ROUND_TYPES = ["technical", "hr", "managerial", "other"] as const;
export const ROUND_RESULTS = ["pending", "passed", "failed"] as const;

export interface IHistoryItem {
  stage: Stage;
  date: Date;
}

export interface IRound {
  number: number;
  date: Date;
  type: (typeof ROUND_TYPES)[number];
  notes: string;
  result: (typeof ROUND_RESULTS)[number];
  feedback: string;
}

export interface IApplication {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  resumeId: Types.ObjectId;
  appliedAt: Date;
  stage: Stage;
  followUpDate?: Date;
  history: IHistoryItem[];
  rounds: IRound[];
}

const applicationSchema = new Schema<IApplication>(
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
    appliedAt: {
      type: Date,
      required: true
    },
    stage: {
      type: String,
      enum: STAGES,
      default: "applied"
    },
    followUpDate: {
      type: Date
    },
    history: [
      {
        _id: false,
        stage: {
          type: String,
          enum: STAGES,
          required: true
        },
        date: {
          type: Date,
          required: true
        },
      },
    ],
    rounds: [
      {
        number: {
          type: Number,
          required: true,
          min: 1
        },
        date: {
          type: Date,
          required: true
        },
        type: {
          type: String,
          enum: ROUND_TYPES,
          required: true
        },
        notes: {
          type: String,
          default: "",
          maxlength: 300
        },
        result: {
          type: String,
          enum: ROUND_RESULTS,
          default: "pending"
        },
        feedback: {
          type: String,
          default: "",
          maxlength: 500
        },
      },
    ],
  },
  { timestamps: true }
);

applicationSchema.index({
  userId: 1,
  jobId: 1
}, { unique: true });

applicationSchema.index({
  userId: 1, appliedAt: -1
});

export const Application = model<IApplication>("Application", applicationSchema);
