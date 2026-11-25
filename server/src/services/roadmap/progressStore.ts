// Reading and saving his roadmap progress (the part of the roadmap code that touches the database).

import { RoadmapProgress } from "../../models/RoadmapProgress";
import { emptyProgress } from "./rules";
import type { ProgressData } from "./rules";

// his progress as plain data (an empty one when he has not started)
export async function loadProgress(userId: string | undefined): Promise<ProgressData> {
  const saved = await RoadmapProgress.findOne({ userId });
  if (!saved) return emptyProgress();

  return {
    doneTopics: [...saved.doneTopics],
    resources: saved.resources.map(({ topicId, text }) => ({ topicId, text })),
    levels: saved.levels.map((item) => ({
      skillId: item.skillId,
      level: item.level,
      status: item.status,
      attempts: item.attempts,
      bestScore: item.bestScore,
      nextAttemptAt: item.nextAttemptAt,
    })),
    manualUnlocks: [...saved.manualUnlocks],
    studiedFlows: [...saved.studiedFlows],
  };
}

export async function saveProgress(userId: string | undefined, progress: ProgressData): Promise<void> {
  await RoadmapProgress.findOneAndUpdate({ userId }, { $set: progress }, { upsert: true, setDefaultsOnInsert: true });
}
