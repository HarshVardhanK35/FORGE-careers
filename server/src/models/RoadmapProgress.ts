import { Schema, model, Types } from "mongoose";

export type LevelStatus = "none" | "passed" | "skipped";

// the result of one level of one skill
export interface ILevelProgress {
  skillId: string;
  level: 1 | 2 | 3;
  status: LevelStatus; // none = not passed yet
  attempts: number;
  bestScore: number | null; // a percent
  nextAttemptAt: Date | null; // set after a failed attempt (the wait)
}

export interface IRoadmapProgress {
  userId: Types.ObjectId;
  doneTopics: string[]; // the ids of the topics he ticked
  resources: { topicId: string; text: string }[]; // his own link or note for a topic
  levels: ILevelProgress[];
  manualUnlocks: string[]; // the skills opened with "Unlock anyway"
  studiedFlows: string[]; // the ids of the project flows he studied
}

const roadmapProgressSchema = new Schema<IRoadmapProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    doneTopics: { type: [String], default: [] },
    resources: [
      {
        _id: false,
        topicId: { type: String, required: true },
        text: { type: String, default: "", maxlength: 300 },
      },
    ],
    levels: [
      {
        _id: false,
        skillId: { type: String, required: true },
        level: { type: Number, enum: [1, 2, 3], required: true },
        status: { type: String, enum: ["none", "passed", "skipped"], default: "none" },
        attempts: { type: Number, default: 0, min: 0 },
        bestScore: { type: Number, default: null, min: 0, max: 100 },
        nextAttemptAt: { type: Date, default: null },
      },
    ],
    manualUnlocks: { type: [String], default: [] },
    studiedFlows: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const RoadmapProgress = model<IRoadmapProgress>("RoadmapProgress", roadmapProgressSchema);

/**
 * One document per user holds all his roadmap progress, because it is small and always read together.
 *
 * Only what he DID is stored (ticks, resources, results, skips). What is open, locked or waiting is worked out
 *  by the rules in services/roadmap/rules.ts every time, so the rules can change without changing the data.
 */
