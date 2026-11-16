import { Router } from "express";
import { z } from "zod";

import { isValidObjectId } from "mongoose";

import { Resume } from "../models/Resume";
import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const createResumeSchema = z.object({
  label: z.string().trim().min(1).max(100).optional(),
  text: z.string().trim().min(1).max(20000),
  note: z.string().max(500).optional(),
});

// saving a resume
router.post("/", async (req: AuthRequest, res) => {
  const parsed = createResumeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const latest = await Resume.findOne({
    userId: req.userId
  }).sort({ versionNumber: -1 });
  const versionNumber = latest ? latest.versionNumber + 1 : 1;

  await Resume.updateMany({ userId: req.userId }, { isCurrent: false });

  const resume = await Resume.create({
    userId: req.userId,
    versionNumber,
    label: parsed.data.label ?? `v${versionNumber}`,
    text: parsed.data.text,
    note: parsed.data.note ?? "",
    isCurrent: true,
  });

  res.status(201).json(resume);
});

// to get all resumes
router.get("/", async (req: AuthRequest, res) => {
  const resumes = await Resume.find({ userId: req.userId })
    .select("-text")
    .sort({ versionNumber: -1 });
  res.json(resumes);
});

// to get a resume
router.get("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const resume = await Resume.findOne({ _id: id, userId: req.userId });
  if (!resume) {
    res.status(404).json({ message: "Resume version not found" });
    return;
  }

  res.json(resume);
});

// update a resume
router.patch("/:id/current", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const resume = await Resume.findOne({ _id: id, userId: req.userId });
  if (!resume) {
    res.status(404).json({ message: "Resume version not found" });
    return;
  }

  await Resume.updateMany({ userId: req.userId }, { isCurrent: false });
  resume.isCurrent = true;
  await resume.save();

  res.json({ message: "Current version changed" });
});

// delete a resume
router.delete("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const resume = await Resume.findOneAndDelete({ _id: id, userId: req.userId });
  if (!resume) {
    res.status(404).json({ message: "Resume version not found" });
    return;
  }

  if (resume.isCurrent) {
    const newest = await Resume.findOne({ userId: req.userId }).sort({ versionNumber: -1 });
    if (newest) {
      newest.isCurrent = true;
      await newest.save();
    }
  }

  res.json({ message: "Deleted" });
});

export default router;
