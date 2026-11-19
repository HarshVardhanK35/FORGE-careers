import { Router } from "express";
import { z } from "zod";
import { isValidObjectId } from "mongoose";

import { Job } from "../models/Job";
import { Application } from "../models/Application";
import { JobMatch } from "../models/JobMatch";

import { protect, AuthRequest } from "../middleware/protect";

const router = Router();

router.use(protect);

const createJobSchema = z.object({
  company: z.string().trim().min(1).max(50),
  title: z.string().trim().min(1).max(60),
  source: z.string().trim().max(25).optional(),

  // URL type is checked here (from response object)
  // This accepts a valid link or an empty text
  //    Without it, you could never clear a link once it was saved
  link: z.union([z.string().trim().url().max(500), z.literal("")]).optional(),

  description: z.string().trim().min(1).max(20000),
  note: z.string().trim().max(100).optional(),
  location: z.string().trim().max(30).optional(),
  salaryRange: z.string().trim().max(10).optional(),
});

// .partial() makes every field opt, so an edit can send just the fields that change
const updateJobSchema = createJobSchema.partial();

router.post("/", async (req: AuthRequest, res) => {
  const parsed = createJobSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  // counting existing jobs with same company and title before creating new one
  const sameCount = await Job.countDocuments({
    userId: req.userId,
    company: parsed.data.company,
    title: parsed.data.title,
  })
    // comparison ignores  upper and lower cases, so Acme and acme count as the same
    .collation({ locale: "en", strength: 2 });

  // if not a duplicate, we will save the job!
  const job = await Job.create({ userId: req.userId, ...parsed.data });

  // returns {job, true/false}
  res.status(201).json({ job, duplicate: sameCount > 0 });
});

// get all jobs
router.get("/", async (req: AuthRequest, res) => {
  const jobs = await Job.find({ userId: req.userId })
    .select("-description")
    .sort({ createdAt: -1 });
  res.json(jobs);
});

// get a job with it's ID
router.get("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const job = await Job.findOne({ _id: id, userId: req.userId });
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }

  res.json(job);
});

// patch here cause we only change some fields
router.patch("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const parsed = updateJobSchema.safeParse(req.body);
  if (!parsed.success || Object.keys(parsed.data).length === 0) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  // find one job, change it and give it back
  /**
   * 1. job must have an id and belong to signed in user
   * 
   * 2. $set is a MongoDB operator that changes only the fields listed and leaves the rest alone. 
   *    parsed.data holds the checked fields from the request
   * 
   * 3. how to do it
   *    returnDocument: "after" --- returns job as it is after the change - default would return old job
   *    runValidators: true makes Mongoose apply the schema rules during update. without this checks are skipped while updating
   * 
   */
  const job = await Job.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { $set: parsed.data },
    { returnDocument: "after", runValidators: true }
  );
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }

  res.json(job);
});

// delete a job with it's id!
router.delete("/:id", async (req: AuthRequest, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }

  const hasApplication = await Application.exists({ userId: req.userId, jobId: id });
  if (hasApplication) {
    res.status(409).json({ message: "This job has an application and cannot be deleted" });
    return;
  }

  const job = await Job.findOneAndDelete({ _id: id, userId: req.userId });
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }

  await JobMatch.deleteMany({ jobId: id, userId: req.userId });

  res.json({ message: "Deleted" });
});


export default router;
