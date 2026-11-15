import { Router } from "express";
import { z } from "zod";
import { Settings } from "../models/Settings";
import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const modelChoiceInput = z.object({
  provider: z.string().min(1),
  model: z.string().min(1),
});

const settingsInputSchema = z.object({
  applyThreshold: z.number().min(0).max(100).optional(),
  dailyAiCallCap: z.number().int().min(0).max(1000).optional(),
  modelOverrides: z
    .object({
      resumeCheck: modelChoiceInput.optional(),
      jobMatch: modelChoiceInput.optional(),
      answerFeedback: modelChoiceInput.optional(),
    })
    .optional(),
});

router.get("/", async (req: AuthRequest, res) => {
  let settings = await Settings.findOne({ userId: req.userId });
  if (!settings) {
    settings = await Settings.create({ userId: req.userId });
  }
  res.json(settings);
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

  res.json(settings);
});

export default router;

/**
 * Same pattern as the profile route 
 * 
 * The difference: GET creates the settings document with the defaults the first time it is read, so the app always has settings to show.
 * 
 * 
 */
