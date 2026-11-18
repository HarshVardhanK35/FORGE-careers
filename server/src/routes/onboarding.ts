import { Router } from "express";
import { z } from "zod";

import { Profile } from "../models/Profile";
import { Skill, BUCKETS, CATEGORIES, Bucket } from "../models/Skill";

import { protect, AuthRequest } from "../middleware/protect";

import {
  FOCUS_LIMITS,
  MIN_TECHNICAL_PRIMARY,
  focusCounts,
  focusProblem,
  FocusItem,
} from "../services/onboarding/focus";

const router = Router();

router.use(protect);

const completeSchema = z.object({
  buckets: z.array(
    z.object({
      skillId: z.string().min(1),
      bucket: z.enum(BUCKETS),
    })
  ),
});

const moveSchema = z.object({
  bucket: z.enum(BUCKETS),
});

type SkillSummary = { skillId: string; layer: string; suggestedBucket: Bucket };

// the recommended set: 3 technical Primary, 2 technical Secondary, 1 professional Primary
function recommendedIds(skills: SkillSummary[]): Set<string> {
  const first = (layer: string, bucket: Bucket, count: number): string[] =>
    skills
      .filter((s) => s.layer === layer && s.suggestedBucket === bucket)
      .slice(0, count)
      .map((s) => s.skillId);

  return new Set([
    ...first("technical", "primary", 3),
    ...first("technical", "secondary", 2),
    ...first("professional", "primary", 1),
  ]);
}

// the P or S tag shown on a skill that sits in Later
function tagFor(bucket: Bucket): "P" | "S" | null {
  if (bucket === "primary") return "P";
  if (bucket === "secondary") return "S";
  return null;
}

// how many skills fill each slot, and the limits, for the client to show
function focusInfo(items: FocusItem[]) {
  return {
    focus: {
      counts: focusCounts(items),
      limits: FOCUS_LIMITS,
      minimumTechnicalPrimary: MIN_TECHNICAL_PRIMARY,
    },
  };
}

// the catalog with the user's choices (or the recommended preselection before onboarding)
router.get("/", async (req: AuthRequest, res) => {
  const [skills, profile] = await Promise.all([
    Skill.find().sort({ layer: -1, order: 1 }).lean(),
    Profile.findOne({ userId: req.userId }),
  ]);

  const complete = profile?.onboardingComplete ?? false;
  const saved = new Map((profile?.buckets ?? []).map((b) => [b.skillId, b.bucket] as const));
  const recommended = recommendedIds(skills);

  const items = skills.map((skill) => {
    const isRecommended = recommended.has(skill.skillId);
    const preselected: Bucket = isRecommended ? skill.suggestedBucket : "later";
    const bucket: Bucket = complete ? (saved.get(skill.skillId) ?? "later") : preselected;

    return {
      skillId: skill.skillId,
      name: skill.name,
      description: skill.description,
      layer: skill.layer,
      category: skill.category,
      order: skill.order,
      suggestedBucket: skill.suggestedBucket,
      tag: tagFor(skill.suggestedBucket),
      recommended: isRecommended,
      bucket,
    };
  });

  res.json({
    onboardingComplete: complete,
    categories: CATEGORIES,
    ...focusInfo(items),
    skills: items,
  });
});

// finish onboarding: save the user's choices; every skill not chosen goes to Later
router.put("/", async (req: AuthRequest, res) => {
  const parsed = completeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) {
    res.status(409).json({ message: "Save your profile first" });
    return;
  }

  const skills = await Skill.find().select("skillId layer").lean();
  const known = new Set(skills.map((s) => s.skillId));

  const chosen = new Map<string, Bucket>();
  for (const item of parsed.data.buckets) {
    if (!known.has(item.skillId)) {
      res.status(400).json({ message: `Unknown skill: ${item.skillId}` });
      return;
    }
    if (chosen.has(item.skillId)) {
      res.status(400).json({ message: `Duplicate skill: ${item.skillId}` });
      return;
    }
    chosen.set(item.skillId, item.bucket);
  }

  const finalBuckets = skills.map((s) => ({
    skillId: s.skillId,
    layer: s.layer,
    bucket: chosen.get(s.skillId) ?? ("later" as Bucket),
  }));

  const problem = focusProblem(focusCounts(finalBuckets), true);
  if (problem) {
    res.status(400).json({ message: problem });
    return;
  }

  profile.buckets = finalBuckets.map(({ skillId, bucket }) => ({ skillId, bucket }));
  profile.onboardingComplete = true;
  await profile.save();

  res.json({ message: "Onboarding saved", ...focusInfo(finalBuckets) });
});

// move one skill to another bucket after onboarding
router.patch("/skills/:skillId", async (req: AuthRequest, res) => {
  const skillId = String(req.params.skillId);

  const parsed = moveSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid bucket" });
    return;
  }

  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) {
    res.status(409).json({ message: "Save your profile first" });
    return;
  }
  if (!profile.onboardingComplete) {
    res.status(409).json({ message: "Finish onboarding first" });
    return;
  }

  const skills = await Skill.find().select("skillId layer").lean();
  if (!skills.some((s) => s.skillId === skillId)) {
    res.status(404).json({ message: "Skill not found" });
    return;
  }

  // the buckets as they would be after this move
  const current = new Map(profile.buckets.map((b) => [b.skillId, b.bucket] as const));
  const after = skills.map((s) => ({
    skillId: s.skillId,
    layer: s.layer,
    bucket: s.skillId === skillId ? parsed.data.bucket : (current.get(s.skillId) ?? ("later" as Bucket)),
  }));

  const problem = focusProblem(focusCounts(after), false);
  if (problem) {
    res.status(409).json({ message: problem });
    return;
  }

  const entry = profile.buckets.find((b) => b.skillId === skillId);
  if (entry) {
    entry.bucket = parsed.data.bucket;
  } else {
    profile.buckets.push({ skillId, bucket: parsed.data.bucket });
  }
  await profile.save();

  res.json({ skillId, bucket: parsed.data.bucket, ...focusInfo(after) });
});

export default router;
