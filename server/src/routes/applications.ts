import { Router } from "express";
import { z } from "zod";
import { isValidObjectId, Types } from "mongoose";

import { Application, STAGES, ROUND_TYPES, ROUND_RESULTS } from "../models/Application";
import { Job } from "../models/Job";
import { Resume } from "../models/Resume";

import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const createApplicationSchema = z.object({
  jobId: z.string().refine(isValidObjectId, "Invalid id"),
  resumeId: z.string().refine(isValidObjectId, "Invalid id").optional(),
  followUpDate: z.coerce.date().optional(),
});

const listQuerySchema = z.object({
  stage: z.enum(STAGES).optional(),
});

const stageSchema = z.object({
  stage: z.enum(STAGES),
});

// followUpDate accepts a date, or null to clear it.
const followUpSchema = z.object({
  followUpDate: z.union([z.null(), z.coerce.date()]),
});

const createRoundSchema = z.object({
  date: z.coerce.date(),
  type: z.enum(ROUND_TYPES),
  notes: z.string().max(2000).optional(),
});

const updateRoundSchema = z.object({
  date: z.coerce.date().optional(),
  type: z.enum(ROUND_TYPES).optional(),
  notes: z.string().max(2000).optional(),
  result: z.enum(ROUND_RESULTS).optional(),
  feedback: z.string().max(2000).optional(),
});

const TIMEZONE = "Asia/Kolkata";
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function todayKeyIst(): string {
  return new Date(Date.now() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

function endOfTodayIst(): Date {
  const d = new Date(Date.now() + IST_OFFSET_MS);
  d.setUTCHours(23, 59, 59, 999);
  return new Date(d.getTime() - IST_OFFSET_MS);
}

router.post("/", async (req: AuthRequest, res) => {
  const parsed = createApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const { jobId, resumeId, followUpDate } = parsed.data;

  const job = await Job.findOne({ _id: jobId, userId: req.userId });
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }

  const alreadyApplied = await Application.exists({ userId: req.userId, jobId });
  if (alreadyApplied) {
    res.status(409).json({ message: "Already marked as applied" });
    return;
  }

  const resume = resumeId
    ? await Resume.findOne({ _id: resumeId, userId: req.userId }).select("-text")
    : await Resume.findOne({ userId: req.userId, isCurrent: true }).select("-text");
  if (!resume) {
    res.status(400).json({ message: "Resume version not found. Save a resume first." });
    return;
  }

  const now = new Date();
  const application = await Application.create({
    userId: req.userId,
    jobId: job._id,
    resumeId: resume._id,
    appliedAt: now,
    stage: "applied",
    followUpDate,
    history: [{ stage: "applied", date: now }],
  });

  res.status(201).json(application);
});

router.get("/", async (req: AuthRequest, res) => {
  const query = listQuerySchema.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ message: "Invalid stage" });
    return;
  }

  const filter = { userId: req.userId, ...(query.data.stage ? { stage: query.data.stage } : {}) };

  const applications = await Application.find(filter)
    .select("-history -rounds")
    .populate("jobId", "company title location")
    .sort({ appliedAt: -1 });

  res.json(applications);
});

router.get("/follow-ups", async (req: AuthRequest, res) => {
  const applications = await Application.find({
    userId: req.userId,
    followUpDate: { $lte: endOfTodayIst() },
    stage: { $nin: ["rejected", "succeeded"] },
  })
    .select("-history -rounds")
    .populate("jobId", "company title")
    .sort({ followUpDate: 1 });

  res.json(applications);
});

router.get("/stats", async (req: AuthRequest, res) => {
  const userId = new Types.ObjectId(String(req.userId));

  const [perDayRaw, perStageRaw] = await Promise.all([
    Application.aggregate<{ _id: string; count: number }>([
      { $match: { userId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$appliedAt", timezone: TIMEZONE } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 30 },
    ]),
    Application.aggregate<{ _id: string; count: number }>([
      { $match: { userId } },
      { $group: { _id: "$stage", count: { $sum: 1 } } },
    ]),
  ]);

  const perStage = Object.fromEntries(STAGES.map((stage) => [stage, 0])) as Record<string, number>;
  for (const item of perStageRaw) {
    perStage[item._id] = item.count;
  }

  const total = Object.values(perStage).reduce((sum, count) => sum + count, 0);
  const today = perDayRaw.find((day) => day._id === todayKeyIst())?.count ?? 0;

  res.json({
    total,
    today,
    perStage,
    perDay: perDayRaw.map((day) => ({ date: day._id, count: day.count })),
  });
});

router.get("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const application = await Application.findOne({ _id: id, userId: req.userId })
    .populate("jobId")
    .populate("resumeId", "versionNumber label");
  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  res.json(application);
});

// SECTION: for every application
// ==============================
router.patch("/:id/stage", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const parsed = stageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid stage" });
    return;
  }

  const application = await Application.findOne({ _id: id, userId: req.userId });
  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  if (application.stage === "rejected" || application.stage === "succeeded") {
    res.status(409).json({ message: "This application is final and cannot change stage" });
    return;
  }

  if (application.stage === parsed.data.stage) {
    res.status(400).json({ message: "Already in this stage" });
    return;
  }

  application.stage = parsed.data.stage;
  application.history.push({ stage: parsed.data.stage, date: new Date() });
  await application.save();

  res.json(application);
});

router.patch("/:id/follow-up", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const parsed = followUpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const application = await Application.findOne({ _id: id, userId: req.userId });
  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  application.followUpDate = parsed.data.followUpDate ?? undefined;
  await application.save();

  res.json(application);
});

router.post("/:id/rounds", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const parsed = createRoundSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const application = await Application.findOne({ _id: id, userId: req.userId });
  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  const number = application.rounds.reduce((max, round) => Math.max(max, round.number), 0) + 1;
  application.rounds.push({
    number,
    date: parsed.data.date,
    type: parsed.data.type,
    notes: parsed.data.notes ?? "",
    result: "pending",
    feedback: "",
  });
  await application.save();

  res.status(201).json(application);
});

router.patch("/:id/rounds/:roundId", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  const roundId = String(req.params.roundId);
  if (!isValidObjectId(id) || !isValidObjectId(roundId)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const parsed = updateRoundSchema.safeParse(req.body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const set: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parsed.data)) {
    set[`rounds.$.${key}`] = value;
  }

  const application = await Application.findOneAndUpdate(
    { _id: id, userId: req.userId, "rounds._id": roundId },
    { $set: set },
    { returnDocument: "after", runValidators: true }
  );
  if (!application) {
    res.status(404).json({ message: "Application or round not found" });
    return;
  }

  res.json(application);
});

router.delete("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const application = await Application.findOne({ _id: id, userId: req.userId }).select("stage");
  if (!application) {
    res.status(404).json({ message: "Application not found" });
    return;
  }

  if (application.stage === "rejected" || application.stage === "succeeded") {
    res.status(409).json({ message: "Rejected and succeeded applications are kept" });
    return;
  }

  await application.deleteOne();
  res.json({ message: "Deleted" });
});

export default router;
