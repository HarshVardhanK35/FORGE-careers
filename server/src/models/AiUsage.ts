import { Schema, model, Types } from "mongoose";

export interface IAiUsage {
  userId: Types.ObjectId;
  date: string;
  count: number;
}

const aiUsageSchema = new Schema<IAiUsage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    },
  },
  { timestamps: true }
);

// one document per user per day holds how many AI calls were made
aiUsageSchema.index({
  userId: 1,
  date: 1
  // unique: allows one document for each day
}, { unique: true });

export const AiUsage = model<IAiUsage>("AiUsage", aiUsageSchema);
