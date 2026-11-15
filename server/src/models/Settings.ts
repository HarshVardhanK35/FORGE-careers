import { Schema, model, Types } from "mongoose";

export interface IModelChoice {
  provider: string;
  model: string;
}

export interface ISettings {
  userId: Types.ObjectId;
  applyThreshold: number;
  dailyAiCallCap: number;
  modelOverrides: {
    resumeCheck?: IModelChoice;
    jobMatch?: IModelChoice;
    answerFeedback?: IModelChoice;
  };
}

const modelChoiceSchema = new Schema<IModelChoice>(
  {
    provider: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
  },
  { _id: false }
);

const settingsSchema = new Schema<ISettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    applyThreshold: {
      type: Number,
      min: 0,
      max: 100,
      default: 85
    },
    dailyAiCallCap: {
      type: Number,
      min: 0,
      default: 50
    },
    modelOverrides: {
      resumeCheck: modelChoiceSchema,
      jobMatch: modelChoiceSchema,
      answerFeedback: modelChoiceSchema,
    },
  },
  { timestamps: true }
);

export const Settings = model<ISettings>("Settings", settingsSchema);

/**
 * applyThreshold is the 85% line from the plan, now a setting. 
 * 
 * dailyAiCallCap protects the free AI quota; 
 *    50 is a placeholder we'll revisit after checking the real provider limits. 
 * 
 * modelOverrides holds only your choices per task. 
 * 
 * The recommended defaults will live in code, so an empty override means "use the default". 
 * 
 * The override fields are optional, so a new account has none.
 * 
 */
