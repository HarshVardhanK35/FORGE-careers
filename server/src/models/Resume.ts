import { Schema, model, Types } from "mongoose";

export interface IResume {
  userId: Types.ObjectId;
  versionNumber: number;
  label: string;
  text: string;
  note: string;
  isCurrent: boolean;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    versionNumber: {
      type: Number,
      required: true,
      min: 1
    },
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    text: {
      type: String,
      required: true,
      maxlength: 20000
    },
    note: {
      type: String,
      default: "",
      maxlength: 500
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

resumeSchema.index({
  userId: 1,
  versionNumber: 1
}, { unique: true });

export const Resume = model<IResume>("Resume", resumeSchema);
