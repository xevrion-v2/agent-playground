import express from "express";

import usersRouter from "./routes/users";
import { createShutdownHandler } from "./shutdown";

const app = express();
const port = process.env.PORT || 4000;
const shutdownTimeoutMs = Number.parseInt(process.env.SHUTDOWN_TIMEOUT_MS ?? "10000", 10);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

const shutdown = createShutdownHandler({
  server,
  timeoutMs: shutdownTimeoutMs
});

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
