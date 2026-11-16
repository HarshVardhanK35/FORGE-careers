import { Schema, model, Types } from "mongoose";

export interface IJob {
  userId: Types.ObjectId;
  company: string;
  title: string;
  source: string;
  link: string;
  description: string;
  note: string;
  location: string;
  salaryRange: string;
}

const jobSchema = new Schema<IJob>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    source: {
      type: String,
      default: "",
      trim: true,
      maxlength: 50
    },
    link: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500
    },
    description: {
      type: String,
      required: true,
      maxlength: 20000
    },
    note: {
      type: String,
      default: "",
      maxlength: 500
    },
    location: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100
    },
    salaryRange: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100
    },
  },
  { timestamps: true }
);

// The index makes "all my jobs, newest first" fast
jobSchema.index({
  userId: 1,
  createdAt: -1
});

export const Job = model<IJob>("Job", jobSchema);
