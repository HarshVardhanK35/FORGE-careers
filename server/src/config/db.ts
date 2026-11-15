import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

/**
 * Promise<void> === declared return type of connectDb
 *  Promise - JS object for work that isn't finished yet (network call)
 *  <void> - when work finishes, nothing is returned back!
 * 
 * 
 */
export async function connectDb(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected");
}
