import { Router } from "express";
import { z } from "zod";
import { isValidObjectId } from "mongoose";

import { Job } from "../models/Job";
import { Resume } from "../models/Resume";
import { Profile } from "../models/Profile";
import { Settings } from "../models/Settings";
import { JobMatch } from "../models/JobMatch";

import { protect, AuthRequest } from "../middleware/protect";

import { prepareResumeForAi } from "../utils/aiText";

import { buildMatchPrompt } from "../services/jobMatch/prompt";
import { checkAnswer, parseAnswerText } from "../services/jobMatch/answer";
import { scoreMatch, yearsNote } from "../services/jobMatch/scoring";

const router = Router();

router.use(protect);

const DEFAULT_APPLY_THRESHOLD = 60;

const promptSchema = z.object({
  jobId: z.string().refine(isValidObjectId, "Invalid id"),
  resumeId: z.string().refine(isValidObjectId, "Invalid id").optional(),
});

const createSchema = promptSchema.extend({
  source: z.string().trim().min(1).max(30),
  // the pasted text, or the JSON object itself
  answer: z.union([z.string().max(30000), z.record(z.string(), z.unknown())]),
});

const listQuerySchema = z.object({
  jobId: z.string().refine(isValidObjectId, "Invalid id").optional(),
});

// the given resume version, or the current one
function findResume(userId: string | undefined, resumeId: string | undefined) {
  const filter = resumeId ? { _id: resumeId, userId } : { userId, isCurrent: true };
  return Resume.findOne(filter).select("versionNumber text");
}

// step 1: build the text to paste into ChatGPT or Claude
router.post("/prompt", async (req: AuthRequest, res) => {
  const parsed = promptSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const job = await Job.findOne({ _id: parsed.data.jobId, userId: req.userId });
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }

  const resume = await findResume(req.userId, parsed.data.resumeId);
  if (!resume) {
    const status = parsed.data.resumeId ? 404 : 400;
    res.status(status).json({ message: "Resume version not found. Save a resume first." });
    return;
  }

  const prompt = buildMatchPrompt({
    title: job.title,
    company: job.company,
    description: job.description,
    resumeText: prepareResumeForAi(resume.text),
  });

  res.json({ prompt, resumeVersion: resume.versionNumber });
});

// step 2: the pasted answer goes in, the score comes out
router.post("/", async (req: AuthRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const job = await Job.findOne({ _id: parsed.data.jobId, userId: req.userId });
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }

  const resume = await findResume(req.userId, parsed.data.resumeId);
  if (!resume) {
    const status = parsed.data.resumeId ? 404 : 400;
    res.status(status).json({ message: "Resume version not found. Save a resume first." });
    return;
  }

  const answer =
    typeof parsed.data.answer === "string"
      ? parseAnswerText(parsed.data.answer)
      : checkAnswer(parsed.data.answer);
  if (!answer.ok) {
    res.status(400).json({ message: answer.message });
    return;
  }

  const data = answer.data;
  if (data.requiredSkills.length + data.niceToHaveSkills.length === 0) {
    res.status(400).json({ message: "The answer lists no skills for the job" });
    return;
  }

  const settings = await Settings.findOne({ userId: req.userId }).select("applyThreshold");
  const threshold = settings?.applyThreshold ?? DEFAULT_APPLY_THRESHOLD;

  const profile = await Profile.findOne({ userId: req.userId }).select("yearsOfExperience");
  const yearsHave = profile?.yearsOfExperience ?? 0;

  const score = scoreMatch({
    required: data.requiredSkills,
    niceToHave: data.niceToHaveSkills,
    resume: data.resumeSkills,
    threshold,
  });

  const match = await JobMatch.create({
    userId: req.userId,
    jobId: job._id,
    resumeId: resume._id,
    source: parsed.data.source,
    method: "paste",
    requiredSkills: data.requiredSkills,
    niceToHaveSkills: data.niceToHaveSkills,
    resumeSkills: data.resumeSkills,
    yearsRequired: data.yearsRequired ?? null,
    ...score,
    threshold,
    yearsNote: yearsNote(data.yearsRequired, yearsHave) ?? "",
  });

  res.status(201).json(match);
});

// the results, newest first; optionally only those of one job
router.get("/", async (req: AuthRequest, res) => {
  const query = listQuerySchema.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ message: "Invalid jobId" });
    return;
  }

  const filter = {
    userId: req.userId,
    ...(query.data.jobId ? { jobId: query.data.jobId } : {}),
  };

  const matches = await JobMatch.find(filter).sort({ createdAt: -1 });
  res.json(matches);
});

router.get("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const match = await JobMatch.findOne({ _id: id, userId: req.userId });
  if (!match) {
    res.status(404).json({ message: "Match not found" });
    return;
  }

  res.json(match);
});

router.delete("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const match = await JobMatch.findOneAndDelete({ _id: id, userId: req.userId });
  if (!match) {
    res.status(404).json({ message: "Match not found" });
    return;
  }

  res.json({ message: "Deleted" });
});

export default router;
