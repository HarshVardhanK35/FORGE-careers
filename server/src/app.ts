import express from "express";
import cookieParser from "cookie-parser";

import healthRouter from "./routes/health";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRouter);
app.use("/auth", authRouter);

export default app;
