import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set in .env`);
  }
  return value;
}

// A secret is only accepted when it is long enough to be hard to guess (checked in production only,
// so a short secret on your laptop still works).
function requireSecret(name: string): string {
  const value = requireEnv(name);
  if (process.env.NODE_ENV === "production" && value.length < 32) {
    throw new Error(`${name} must be at least 32 characters in production`);
  }
  return value;
}

export const PORT = Number(process.env.PORT) || 5000;
export const MONGODB_URI = requireEnv("MONGODB_URI");
export const SETUP_SECRET = requireSecret("SETUP_SECRET");
export const JWT_ACCESS_SECRET = requireSecret("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = requireSecret("JWT_REFRESH_SECRET");
export const NODE_ENV = process.env.NODE_ENV || "development";
export const GROQ_API_KEY = requireEnv("GROQ_API_KEY");

// Render sets RENDER=true on every service. If it is set but NODE_ENV is not "production", the cookies would lose
// their Secure flag and error details would be shown, so the server refuses to start.
if (process.env.RENDER && NODE_ENV !== "production") {
  throw new Error("NODE_ENV must be production on Render");
}

// The two tokens must be signed with different secrets, or one could be used as the other.
if (JWT_ACCESS_SECRET === JWT_REFRESH_SECRET) {
  throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different");
}
