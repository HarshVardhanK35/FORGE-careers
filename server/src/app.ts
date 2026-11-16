import express from "express";
import cookieParser from "cookie-parser";

import healthRouter from "./routes/health";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import settingsRouter from "./routes/settings";
import resumesRouter from "./routes/resumes";
import jobsRouter from "./routes/jobs";
import applicationsRouter from "./routes/applications";

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

export default app;
