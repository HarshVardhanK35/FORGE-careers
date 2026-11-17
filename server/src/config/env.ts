import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set in .env`);
  }
  return value;
}

export const PORT = Number(process.env.PORT) || 5000;
export const MONGODB_URI = requireEnv("MONGODB_URI");
export const SETUP_SECRET = requireEnv("SETUP_SECRET");
export const JWT_ACCESS_SECRET = requireEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = requireEnv("JWT_REFRESH_SECRET");
export const NODE_ENV = process.env.NODE_ENV || "development";
export const GROQ_API_KEY = requireEnv("GROQ_API_KEY");
