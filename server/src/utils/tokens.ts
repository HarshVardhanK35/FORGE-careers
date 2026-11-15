import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config/env";

export function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
