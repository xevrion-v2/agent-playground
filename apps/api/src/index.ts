import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const shutdownTimeoutMs = 10_000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

let isShuttingDown = false;

const shutdown = (signal: NodeJS.Signals) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}; draining TaskFlow API server`);

  const forceExitTimer = setTimeout(() => {
    console.error("Graceful shutdown timed out; forcing exit");
    process.exit(1);
  }, shutdownTimeoutMs);
  forceExitTimer.unref();

  server.close((error) => {
    clearTimeout(forceExitTimer);

    if (error) {
      console.error("Error while closing TaskFlow API server", error);
      process.exit(1);
    }

    console.log("TaskFlow API server closed cleanly");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export { app, server };
