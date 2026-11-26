import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  passwordHash: string;
  refreshTokenHash?: string;
  previousRefreshTokenHash?: string;
  previousRefreshAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true

    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    refreshTokenHash: {
      type: String,
      select: false
    },
    previousRefreshTokenHash: {
      type: String,
      select: false
    },
    previousRefreshAt: {
      type: Date,
      select: false
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
