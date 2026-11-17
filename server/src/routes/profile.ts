import { Router } from "express";
import { z } from "zod";
import { Profile } from "../models/Profile";
import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const profileInputSchema = z.object({
  name: z.string().trim().min(1),
  targetRole: z.string().trim().min(1).optional(),
  yearsOfExperience: z.number().min(0).optional(),
  background: z.string().optional(),
  careerGap: z
    .object({
      text: z.string(),
      fromMonth: z.number().int().min(1).max(12).optional(),
      fromYear: z.number().int().optional(),
      toMonth: z.number().int().min(1).max(12).optional(),
      toYear: z.number().int().optional(),
    })
    .optional(),
  hoursPerDay: z.number().min(0).max(24).optional(),
  resourceLanguage: z.string().optional(),
  dsa: z
    .object({
      enabled: z.boolean(),
      language: z.string().optional(),
    })
    .optional(),
});

router.get("/", async (req: AuthRequest, res) => {
  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) {
    res.status(404).json({ message: "Profile not found" });
    return;
  }
  res.json(profile);
});

router.put("/", async (req: AuthRequest, res) => {
  const parsed = profileInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const profile = await Profile.findOneAndUpdate(
    { userId: req.userId },
    { $set: parsed.data },
    // "update this user's profile, or create it if none exists"
    {
      upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true
    }
  );

  res.json(profile);
});

export default router;

/**
 * router.use(protect) puts the gatekeeper in front of every route in this file. 
 * 
 * The Zod schema lists what the client may send; 
 *    anything else (such as a fake userId) is dropped, because Zod removes unknown fields. 
 * 
 * findOneAndUpdate with upsert: true means "update this user's profile, or create it if none exists", 
 *    so one PUT works for first save and later edits. 
 *    so $set changes only the fields we send. 
 * 
 * returnDocument: "after" returns the saved version, 
 *  and runValidators makes MongoDB-side rules (like min and enum) apply on updates too.
 * 
 */