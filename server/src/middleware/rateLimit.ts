import rateLimit from "express-rate-limit";

// One counter per address: after `limit` calls in `minutes`, the route answers 429 until the time is over.
function makeLimiter(minutes: number, limit: number, skipSuccessful = false) {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    limit,
    standardHeaders: true, // tells the caller how many tries are left
    legacyHeaders: false,
    skipSuccessfulRequests: skipSuccessful, // a correct login does not use up a try
    message: { message: "Too many attempts. Please try again later." },
  });
}

export const loginLimiter = makeLimiter(15, 10, true); // 10 wrong passwords in 15 minutes
export const signupLimiter = makeLimiter(60, 5); // 5 sign-up tries in an hour
export const refreshLimiter = makeLimiter(15, 40); // the app refreshes by itself, so this is more generous
