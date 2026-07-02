import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

const shutdownTimeoutMs = Number(process.env.GRACEFUL_SHUTDOWN_TIMEOUT_MS ?? 10000);
let isShuttingDown = false;

function shutdown(signal: NodeJS.Signals): void {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}; closing TaskFlow API server`);

  const forceExitTimer = setTimeout(() => {
    console.error("Graceful shutdown timed out; forcing process exit");
    process.exit(1);
  }, shutdownTimeoutMs);
  forceExitTimer.unref();

  server.close((error?: Error) => {
    clearTimeout(forceExitTimer);

    if (error) {
      console.error("TaskFlow API server shutdown failed", error);
      process.exit(1);
    }

    console.log("TaskFlow API server closed");
    process.exit(0);
  });
}

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
