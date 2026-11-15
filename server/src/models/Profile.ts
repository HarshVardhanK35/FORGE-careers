import { Schema, model, Types } from "mongoose";

export type Bucket = "primary" | "secondary" | "later";

export interface IBucketItem {
  skillId: string;
  bucket: Bucket;
}

export interface IProfile {
  userId: Types.ObjectId;
  name: string;
  targetRole: string;
  yearsOfExperience: number;
  background: string;
  careerGap: {
    text: string;
    fromMonth?: number;
    fromYear?: number;
    toMonth?: number;
    toYear?: number;
  };
  hoursPerDay: number;
  resourceLanguage: string;
  dsa: {
    enabled: boolean;
    language?: string;
  };
  buckets: IBucketItem[];
}

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    targetRole: {
      type: String,
      default: "MERN stack developer",
      trim: true
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      default: 0
    },
    background: {
      type: String,
      default: ""
    },
    careerGap: {
      text: {
        type: String,
        default: ""
      },
      fromMonth: {
        type: Number,
        min: 1,
        max: 12
      },
      fromYear: {
        type: Number
      },
      toMonth: {
        type: Number,
        min: 1,
        max: 12
      },
      toYear: {
        type: Number
      },
    },
    hoursPerDay: {
      type: Number,
      min: 0,
      max: 24,
      default: 4
    },
    resourceLanguage: {
      type: String,
      default: "English"
    },
    dsa: {
      enabled: {
        type: Boolean,
        default: false
      },
      language: {
        type: String
      },
    },
    buckets: [
      {
        _id: false,
        skillId: {
          type: String,
          required: true
        },
        bucket: {
          type: String,
          enum: ["primary", "secondary", "later"],
          required: true
        },
      },
    ],
  },
  { timestamps: true }
);

export const Profile = model<IProfile>("Profile", profileSchema);

/**
 * userId links the profile to its user (a reference, as discussed) 
 *  and unique: true allows one profile per user. 
 * 
 * type Bucket allows only those three words, so a typo like "primay" fails type-checking. 
 * 
 * Fields with default are filled automatically. 
 *  min, max and enum are validation rules MongoDB-side. 
 * 
 * Inside buckets, _id: false stops Mongoose adding an id to every little item.
 * 
 */