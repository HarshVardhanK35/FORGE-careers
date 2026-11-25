import { Router } from "express";
import type { Response } from "express";
import { z } from "zod";

import { getNotes } from "../data/content";
import { protect, AuthRequest } from "../middleware/protect";
import { loadProgress, saveProgress } from "../services/roadmap/progressStore";
import { buildView, RESOURCE_MAX, RuleError, unlockSkill, updateTopic } from "../services/roadmap/rules";

const router = Router();

router.use(protect);

// a broken rule becomes its own answer; anything else is a real error
function sendRuleError(error: unknown, res: Response): void {
  if (error instanceof RuleError) {
    res.status(error.status).json({ message: error.message });
    return;
  }
  throw error;
}

router.get("/", async (req: AuthRequest, res) => {
  res.json(buildView(await loadProgress(req.userId)));
});

// the learning notes of one topic (the Learn button on the Skills page)
router.get("/topics/:topicId/learn", (req: AuthRequest, res) => {
  const notes = getNotes(String(req.params.topicId));
  if (!notes) {
    res.status(404).json({ message: "There are no notes for this topic yet" });
    return;
  }
  res.json(notes);
});

const topicPatchSchema = z
  .object({
    done: z.boolean().optional(),
    resource: z.string().max(RESOURCE_MAX + 100).optional(),
  })
  .refine((body) => body.done !== undefined || body.resource !== undefined);

// tick or untick a topic, and set or clear its resource
router.patch("/topics/:topicId", async (req: AuthRequest, res) => {
  const parsed = topicPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  try {
    const progress = await loadProgress(req.userId);
    updateTopic(progress, String(req.params.topicId), parsed.data);
    await saveProgress(req.userId, progress);
    res.json(buildView(progress));
  } catch (error) {
    sendRuleError(error, res);
  }
});

// "Unlock anyway": the earlier unpassed levels are marked skipped and the skill opens
router.post("/skills/:skillId/unlock", async (req: AuthRequest, res) => {
  try {
    const progress = await loadProgress(req.userId);
    unlockSkill(progress, String(req.params.skillId));
    await saveProgress(req.userId, progress);
    res.json(buildView(progress));
  } catch (error) {
    sendRuleError(error, res);
  }
});

export default router;

/**
 * GET / answers with the whole roadmap, already worked out: which skill is open, which level is locked, waiting,
 *  passed or skipped, and when the next attempt opens. The client only draws it.
 *
 * GET /topics/:topicId/learn answers with the notes of one topic (data/content), or 404 when there are none yet.
 *
 * A test result is recorded by the test routes (routes/tests.ts), never by the client.
 *
 * Every change loads his progress as plain data, applies one rule from services/roadmap/rules.ts, saves it
 *  and answers with the new roadmap. A broken rule (a locked skill, a level not open) answers 409 with a sentence.
 */
