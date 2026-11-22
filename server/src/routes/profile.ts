import { Router } from "express";
import { z } from "zod";
import { DEFAULT_TARGET_ROLE, Profile } from "../models/Profile";
import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const FIRST_GAP_YEAR = 2020;
const MAX_GAPS = 10;

// one career gap: a short text and a period; months are 1 to 12
const careerGapSchema = z
  .object({
    text: z.string().trim().min(1).max(200),
    fromMonth: z.number().int().min(1).max(12),
    fromYear: z.number().int().min(FIRST_GAP_YEAR),
    toMonth: z.number().int().min(1).max(12),
    toYear: z.number().int().min(FIRST_GAP_YEAR),
  })
  .superRefine((gap, ctx) => {
    const now = new Date();
    const current = now.getFullYear() * 12 + now.getMonth() + 1;
    const from = gap.fromYear * 12 + gap.fromMonth;
    const to = gap.toYear * 12 + gap.toMonth;

    if (from > current || to > current) {
      ctx.addIssue({ code: "custom", message: "A gap cannot be in the future" });
    } else if (from > to) {
      ctx.addIssue({ code: "custom", message: "'From' must not be after 'To'" });
    }
  });

const profileInputSchema = z.object({
  name: z.string().trim().min(1).max(30),
  // an empty role goes back to the default, because the resume check reads it
  targetRole: z
    .string()
    .trim()
    .max(60)
    .transform((role) => role || DEFAULT_TARGET_ROLE)
    .optional(),
  // years and months together, for example 2.75 for 2 years and 9 months
  yearsOfExperience: z.number().min(0).max(41).optional(),
  background: z.string().optional(),
  careerGaps: z.array(careerGapSchema).max(MAX_GAPS).optional(),
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
 * careerGaps is a list of up to 10 periods; superRefine checks one rule that needs two fields at once
 *    (the start is not after the end, and nothing is in the future).
 * 
 * findOneAndUpdate with upsert: true means "update this user's profile, or create it if none exists", 
 *    so one PUT works for first save and later edits. 
 *    so $set changes only the fields we send. 
 * 
 * returnDocument: "after" returns the saved version, 
 *  and runValidators makes MongoDB-side rules (like min and enum) apply on updates too.
 * 
 */
