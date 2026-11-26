import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import healthRouter from "./routes/health";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import settingsRouter from "./routes/settings";
import resumesRouter from "./routes/resumes";
import jobsRouter from "./routes/jobs";
import applicationsRouter from "./routes/applications";
import skillsRouter from "./routes/skills";
import onboardingRouter from "./routes/onboarding";
import resumeChecksRouter from "./routes/resumeChecks";
import jobMatchesRouter from "./routes/jobMatches";
import roadmapRouter from "./routes/roadmap";
import testsRouter from "./routes/tests";

import { NODE_ENV } from "./config/env";

const app = express();

// On Render the app sits behind one proxy: without this every visitor looks like the proxy's address,
// so the limiter would count everybody together.
if (NODE_ENV === "production") app.set("trust proxy", 1);

// Security headers on every answer. The policy lets the page load only from its own address: no outside
// scripts, no outside styles, no framing by other sites. Style attributes (style={{...}} in React) need one exception.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        styleSrcAttr: ["'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        // forces https for everything the page loads: right on Render, but it would break http://localhost
        upgradeInsecureRequests: NODE_ENV === "production" ? [] : null,
      },
    },
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/settings", settingsRouter);
app.use("/resumes", resumesRouter);
app.use("/jobs", jobsRouter);
app.use("/applications", applicationsRouter);
app.use("/skills", skillsRouter);
app.use("/onboarding", onboardingRouter);
app.use("/resume-checks", resumeChecksRouter);
app.use("/job-matches", jobMatchesRouter);
app.use("/roadmap", roadmapRouter);
app.use("/tests", testsRouter);

// An unknown address answers with plain JSON instead of the Express default page.
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// The last stop for any error. It answers with a short plain message and logs only where the error happened:
// never the request body, the query, the error message or any user text (a resume could be in them).
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  const known = error as { type?: string; name?: string; stack?: string };
  const status = known.type === "entity.parse.failed" ? 400 : known.type === "entity.too.large" ? 413 : 500;

  console.log(
    JSON.stringify({
      error: {
        method: req.method,
        path: req.path,
        status,
        name: known.name ?? "Error",
        // the lines after the first one of a stack are file names and line numbers only
        where: (known.stack ?? "").split("\n").slice(1, 4).map((line) => line.trim()),
      },
    })
  );

  if (res.headersSent) {
    next(error); // the answer was already started: let Express close it
    return;
  }
  res.status(status).json({ message: status === 500 ? "Something went wrong" : "Invalid request" });
});

export default app;
