import { Router, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { User } from "../models/User";

import { protect, AuthRequest } from "../middleware/protect";

import { NODE_ENV, SETUP_SECRET, JWT_REFRESH_SECRET } from "../config/env";

import { signAccessToken, signRefreshToken, hashToken, ACCESS_TOKEN_MINUTES, accessExpiresAt } from "../utils/tokens";

const router = Router();

/**
 * z is "ZOD" and z.string() === value must be text string - rule for one field
 * 
 * typescript is used to check while we write code
 * but when a req arrives (req.body) - could be anything,  zod checks that data, but not TS
 * 
 * safeParse = checks req.body against the defined schema 
 *    if fails = parsed.success is false and return 400
 *    if success = parsed.data holds the clean data!
 * 
 */

// signup 
const signupSchema = z.object({
  email: z.string().email(),    // text, and it must look like an email
  password: z
    .string()
    .min(8)
    .regex(/[A-Za-z]/)          // letters
    .regex(/\d/)                // number
    .regex(/[^A-Za-z0-9]/),     //  symbol
  setupSecret: z.string(),      // text, any length
});

// sign up route
router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const { email, password, setupSecret } = parsed.data;

  if (setupSecret !== SETUP_SECRET) {
    res.status(403).json({ message: "Not allowed" });
    return;
  }

  const userCount = await User.countDocuments();
  if (userCount > 0) {
    res.status(403).json({ message: "Sign-up is closed" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({ email, passwordHash });

  res.status(201).json({ message: "Account created" });
});

// login 
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// set of safety rules for the cookies
const cookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: "lax" as const,
};

function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: ACCESS_TOKEN_MINUTES * 60 * 1000 });
  res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

// login route
router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
  const passwordOk = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !passwordOk) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  user.refreshTokenHash = hashToken(refreshToken);
  await user.save();

  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "Logged in", accessExpiresAt: accessExpiresAt() });
});

// get logged in user
router.get("/me", protect, async (req: AuthRequest, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }
  res.json({ id: user.id, email: user.email });
});

// to get new refresh and access tokens
router.post("/refresh", async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    res.status(401).json({ message: "Not signed in" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    if (typeof payload === "string" || !payload.sub) {
      res.status(401).json({ message: "Invalid session" });
      return;
    }

    const user = await User.findById(payload.sub).select("+refreshTokenHash");
    if (!user || user.refreshTokenHash !== hashToken(token)) {
      res.status(401).json({ message: "Invalid session" });
      return;
    }

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    user.refreshTokenHash = hashToken(refreshToken);
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);
    res.json({ message: "Session refreshed", accessExpiresAt: accessExpiresAt() });
  } catch {
    res.status(401).json({ message: "Invalid or expired session" });
  }
});

// logout route
router.post("/logout", protect, async (req: AuthRequest, res) => {
  await User.findByIdAndUpdate(req.userId, { $unset: { refreshTokenHash: "" } });
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.json({ message: "Logged out" });
});

export default router;
