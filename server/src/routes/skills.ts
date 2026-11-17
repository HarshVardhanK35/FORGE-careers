import { Router } from "express";

import { Skill } from "../models/Skill";

import { protect } from "../middleware/protect";

const router = Router();

router.use(protect);

// "technical" sorts after "professional", so layer -1 puts technical skills first
router.get("/", async (_req, res) => {
  const skills = await Skill.find().sort({
    layer: -1,
    order: 1
  });
  res.json(skills);
});

export default router;

/**
 * .sort(...) tells MongoDB in what order to return the documents.
 *    object as an argument: 1 === ascending and -1 === descending
 * 
 */