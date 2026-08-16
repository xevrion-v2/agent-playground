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

const shutdownSignals = ["SIGTERM", "SIGINT"] as const;
let isShuttingDown = false;

function shutDown(signal: (typeof shutdownSignals)[number]) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}; closing TaskFlow API server.`);

  const forcedShutdown = setTimeout(() => {
    console.error("TaskFlow API shutdown timed out.");
    process.exit(1);
  }, 10_000);

  forcedShutdown.unref();

  server.close((error) => {
    clearTimeout(forcedShutdown);

    if (error) {
      console.error("TaskFlow API shutdown failed.", error);
      process.exit(1);
    }

    console.log("TaskFlow API server closed.");
    process.exit(0);
  });
}

shutdownSignals.forEach((signal) => {
  process.on(signal, () => shutDown(signal));
});
