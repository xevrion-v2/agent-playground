/**
 * TaskFlow API — Express entry point.
 *
 * Required environment variables:
 *   PORT        — HTTP listen port (default: 4000)
 *   DATABASE_URL— PostgreSQL connection string (used by @taskflow/db)
 *   JWT_SECRET  — Signing key for auth middleware (future)
 *
 * Optional environment variables:
 *   NODE_ENV    — "development" | "production" (default: development)
 *   LOG_LEVEL   — Verbosity of console logging (default: info)
 */
import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = parseInt(process.env.PORT ?? "4000", 10);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
