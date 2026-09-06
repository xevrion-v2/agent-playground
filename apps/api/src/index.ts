import express from "express";
import type { Server } from "node:http";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const shutdownTimeoutMs = Number(process.env.SHUTDOWN_TIMEOUT_MS || 10000);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const server: Server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

let shuttingDown = false;

const shutdown = (signal: NodeJS.Signals) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`${signal} received. Draining TaskFlow API server...`);

  const timer = setTimeout(() => {
    console.error(`Graceful shutdown timed out after ${shutdownTimeoutMs}ms.`);
    process.exit(1);
  }, shutdownTimeoutMs);
  timer.unref();

  server.close((error) => {
    clearTimeout(timer);

    if (error) {
      console.error("Error while closing TaskFlow API server:", error);
      process.exit(1);
    }

    console.log("TaskFlow API server closed cleanly.");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
