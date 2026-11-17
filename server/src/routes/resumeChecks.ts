import { Router } from "express";
import { z } from "zod";
import { isValidObjectId } from "mongoose";

import { Resume } from "../models/Resume";
import { Profile } from "../models/Profile";
import { ResumeCheck } from "../models/ResumeCheck";

import { protect, AuthRequest } from "../middleware/protect";

import { callAi } from "../services/ai/callAi";
import { isAiFailure, statusForAiFailure } from "../services/ai/errors";
import { buildResumeCheckPrompt, resumeCheckSchema } from "../services/ai/resumeCheck";

import { prepareResumeForAi } from "../utils/aiText";

const router = Router();

router.use(protect);

// Validates that resumeId is a string...
//    and a valid MongoDB ObjectId using Mongoose's isValidObjectId()
const createSchema = z.object({
  resumeId: z.string().refine(isValidObjectId, "Invalid id"),
});

const listQuerySchema = z.object({
  resumeId: z.string().refine(isValidObjectId, "Invalid id").optional(),
});

// run a check on one resume version
router.post("/", async (req: AuthRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const resume = await Resume.findOne({ _id: parsed.data.resumeId, userId: req.userId });
  if (!resume) {
    res.status(404).json({ message: "Resume version not found" });
    return;
  }

  if (resume.text.trim().length < 300) {
    res.status(400).json({ message: "This resume version is too short to check" });
    return;
  }

  const profile = await Profile.findOne({ userId: req.userId }).select("targetRole");
  const targetRole = profile?.targetRole ?? "MERN stack developer";

  const prompt = buildResumeCheckPrompt(targetRole, prepareResumeForAi(resume.text));

  try {
    const result = await callAi({
      userId: String(req.userId),
      task: "resumeCheck",
      system: prompt.system,
      user: prompt.user,
      schema: resumeCheckSchema,
      maxTokens: 2000,
    });

    const check = await ResumeCheck.create({
      userId: req.userId,
      resumeId: resume._id,
      provider: result.provider,
      model: result.model,
      targetRole,
      ...result.data,
    });

    res.status(201).json(check);
  } catch (error) {
    if (isAiFailure(error)) {
      res.status(statusForAiFailure(error)).json({ kind: error.kind, message: error.message });
      return;
    }
    throw error;
  }
});

// the checks, newest first; optionally only those of one resume version
router.get("/", async (req: AuthRequest, res) => {
  const query = listQuerySchema.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ message: "Invalid resumeId" });
    return;
  }

  const filter = {
    userId: req.userId,
    ...(query.data.resumeId ? { resumeId: query.data.resumeId } : {}),
  };

  const checks = await ResumeCheck.find(filter).sort({ createdAt: -1 });
  res.json(checks);
});

router.get("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const check = await ResumeCheck.findOne({ _id: id, userId: req.userId });
  if (!check) {
    res.status(404).json({ message: "Check not found" });
    return;
  }

  res.json(check);
});

export default router;
