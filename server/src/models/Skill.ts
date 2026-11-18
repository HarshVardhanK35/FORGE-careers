import { Schema, model } from "mongoose";

/**
 * turning into readonly tuple with "as const"
 * 
 * Without as const, LAYERS would be typed string[]: any list of text.
 * With as const, it is readonly ["technical", "professional"]: a fixed or immutable list
 */
export const LAYERS = ["technical", "professional"] as const;
export const BUCKETS = ["primary", "secondary", "later"] as const;

// the sections of the onboarding list, in the order they are shown
export const CATEGORIES = [
  { id: "language-web", label: "Language and web basics" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend and APIs" },
  { id: "databases", label: "Databases" },
  { id: "tools", label: "Tools, testing and delivery" },
  { id: "ai", label: "AI" },
  { id: "professional", label: "Professional skills (behavioural)" },
] as const;

export type Category = (typeof CATEGORIES)[number]["id"];
const CATEGORY_IDS: string[] = CATEGORIES.map((category) => category.id);

/**
 * typeof LAYERS takes that tuple's type
 * (typeof LAYERS)[number] means "type of any item in it", which is "technical" | "professional"
 * 
 * Layer is a type that accepts only 2 words
 *    A typo like "technicl" fails at type - check time
 */
export type Layer = (typeof LAYERS)[number];
export type Bucket = (typeof BUCKETS)[number];

export interface ISkill {
  skillId: string;
  name: string;
  description: string;
  layer: Layer;
  category: Category;
  suggestedBucket: Bucket;
  order: number;
  roles: string[];
}

const skillSchema = new Schema<ISkill>(
  {
    skillId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    layer: {
      type: String,
      enum: LAYERS,
      required: true
    },
    category: {
      type: String,
      enum: CATEGORY_IDS,
      required: true
    },
    suggestedBucket: {
      type: String,
      enum: BUCKETS,
      required: true
    },
    order: {
      type: Number,
      required: true,
      min: 1
    },
    roles: {
      type: [String],
      default: ["js-fullstack"]
    },
  },
  { timestamps: true }
);

skillSchema.index({ layer: 1, order: 1 });

export const Skill = model<ISkill>("Skill", skillSchema);
