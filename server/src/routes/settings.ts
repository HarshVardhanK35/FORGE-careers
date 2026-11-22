import { Router } from "express";
import { z } from "zod";
import { AiUsage } from "../models/AiUsage";
import { Settings } from "../models/Settings";
import { AI_MODEL_IDS } from "../services/ai/tasks";
import { todayKeyIst } from "../utils/dates";
import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const modelChoiceInput = z.object({
  provider: z.string().min(1),
  model: z.string().min(1),
});

const settingsInputSchema = z.object({
  applyThreshold: z.number().int().min(0).max(100).optional(),
  dailyApplicationGoal: z.number().int().min(1).max(50).optional(),
  dailyAiCallCap: z.number().int().min(0).max(500).optional(),
  aiModel: z.enum(AI_MODEL_IDS).optional(),
  modelOverrides: z
    .object({
      resumeCheck: modelChoiceInput.optional(),
      jobMatch: modelChoiceInput.optional(),
      answerFeedback: modelChoiceInput.optional(),
    })
    .optional(),
});

// the settings plus how many AI calls were made today (shown as "Used today: 3 of 50")
async function withUsage(settings: InstanceType<typeof Settings>, userId: string | undefined) {
  const usage = await AiUsage.findOne({ userId, date: todayKeyIst() });
  return { ...settings.toObject(), aiUsedToday: usage?.count ?? 0 };
}

router.get("/", async (req: AuthRequest, res) => {
  let settings = await Settings.findOne({ userId: req.userId });
  if (!settings) {
    settings = await Settings.create({ userId: req.userId });
  }
  res.json(await withUsage(settings, req.userId));
});

router.put("/", async (req: AuthRequest, res) => {
  const parsed = settingsInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const settings = await Settings.findOneAndUpdate(
    { userId: req.userId },
    { $set: parsed.data },
    { upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true }
  );

  res.json(await withUsage(settings, req.userId));
});

export default router;

/**
 * Same pattern as the profile route 
 * 
 * The difference: GET creates the settings document with the defaults the first time it is read, so the app always has settings to show.
 * 
 * withUsage adds aiUsedToday (read from the AiUsage document of today) to the answer; it is not stored in the settings.
 * 
 * aiModel is one model for every AI task; z.enum accepts only the models listed in tasks.ts.
 * 
 */
