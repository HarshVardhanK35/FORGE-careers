import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config/env";

export const ACCESS_TOKEN_MINUTES = 25;

// when the access token that is being issued now will end (milliseconds since 1970)
export function accessExpiresAt(): number {
  return Date.now() + ACCESS_TOKEN_MINUTES * 60 * 1000;
}

export function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_MINUTES * 60 });
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
