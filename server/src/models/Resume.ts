import { Schema, model, Types } from "mongoose";

export interface IResume {
  userId: Types.ObjectId;
  versionNumber: number;
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
    text: {
      type: String,
      required: true,
      maxlength: 20000
    },
    note: {
      type: String,
      default: "",
      maxlength: 60
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
