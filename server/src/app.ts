import express from "express";
import cookieParser from "cookie-parser";

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

const app = express();

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

export default app;
