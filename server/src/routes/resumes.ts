import { Router } from "express";
import { z } from "zod";

import { isValidObjectId } from "mongoose";

import { Resume } from "../models/Resume";
import { Application } from "../models/Application";
import { ResumeCheck } from "../models/ResumeCheck";
import { JobMatch } from "../models/JobMatch";

import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const noteSchema = z.string().trim().min(1).max(60);

const createResumeSchema = z.object({
  text: z.string().trim().min(1).max(20000),
  note: noteSchema,
});

const updateNoteSchema = z.object({
  note: noteSchema,
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
    note: parsed.data.note,
    text: parsed.data.text,
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

// change the note of a version (the text never changes)
router.patch("/:id/note", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const parsed = updateNoteSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const resume = await Resume.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { note: parsed.data.note },
    { new: true }
  ).select("-text");

  if (!resume) {
    res.status(404).json({ message: "Resume version not found" });
    return;
  }

  res.json(resume);
});

// delete a resume
router.delete("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const inUse = await Application.exists({ userId: req.userId, resumeId: id });
  if (inUse) {
    res.status(409).json({ message: "This resume version is used by an application" });
    return;
  }

  const resume = await Resume.findOneAndDelete({ _id: id, userId: req.userId });
  if (!resume) {
    res.status(404).json({ message: "Resume version not found" });
    return;
  }

  await ResumeCheck.deleteMany({ resumeId: id, userId: req.userId });
  await JobMatch.deleteMany({ resumeId: id, userId: req.userId });

  if (resume.isCurrent) {
    const newest = await Resume.findOne({ userId: req.userId }).sort({ versionNumber: -1 });
    if (newest) {
      newest.isCurrent = true;
      await newest.save();
    }
  }

  // close the gap: v2 becomes v1, v3 becomes v2 ...
  const remaining = await Resume.find({ userId: req.userId })
    .sort({ versionNumber: 1 })
    .select("versionNumber");

  for (let i = 0; i < remaining.length; i++) {
    const wanted = i + 1;
    if (remaining[i].versionNumber !== wanted) {
      await Resume.updateOne(
        { _id: remaining[i]._id },
        { versionNumber: wanted }
      );
    }
  }

  res.json({ message: "Deleted" });
});

export default router;
