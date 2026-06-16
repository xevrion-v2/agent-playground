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

const SHUTDOWN_TIMEOUT_MS = 10_000;

function shutdown(signal: string): void {
  console.log(`Received ${signal}. Graceful shutdown started.`);
  server.close((err) => {
    if (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
    console.log("Server closed. Exiting.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Shutdown timeout exceeded. Forcing exit.");
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
