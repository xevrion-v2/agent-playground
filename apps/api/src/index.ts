import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const shutdownTimeoutMs = Number(process.env.SHUTDOWN_TIMEOUT_MS ?? 10_000);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

function shutdown(signal: string) {
  console.log(`Received ${signal}, closing HTTP server...`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, shutdownTimeoutMs).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
