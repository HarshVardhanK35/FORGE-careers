import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import { connectDb } from "../config/db";

import { Skill, ISkill } from "../models/Skill";

async function seed(): Promise<void> {
  const file = path.join(__dirname, "../data/skills.json");
  const skills: ISkill[] = JSON.parse(fs.readFileSync(file, "utf-8"));

  await connectDb();

  const operations = skills.map((skill) => ({
    // instruction to bulkWrite --- which is update one document
    updateOne: {
      // filters out skills {skillId: "react"}
      filter: { skillId: skill.skillId },
      // writes fields of a skill
      update: { $set: skill },
      // update or insert --- if there is no document matches the filter - mongoDB creates one
      upsert: true,
    },
  }));
  /**
   * Fast. 
   *    One bulkWrite sends all 46 instructions in one request, not 46 separate ones
   * Safe after edits. 
   *    Change a description in skills.json, run it again, and only that skill is updated.
   */

  const result = await Skill.bulkWrite(operations);
  console.log(
    `Skills in the file: ${skills.length}. New: ${result.upsertedCount}. Updated: ${result.modifiedCount}.`
  );
}

seed()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());


// inside scripts in package.json
//    "seed:skills": "tsx src/scripts/seedSkills.ts"
// npm run seed:skills loads the catalog.
