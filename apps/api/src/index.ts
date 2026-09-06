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

const FORCED_SHUTDOWN_MS = 10_000;

function gracefulShutdown(signal: string) {
  console.log(`${signal} received \u2014 shutting down gracefully`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, FORCED_SHUTDOWN_MS);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
