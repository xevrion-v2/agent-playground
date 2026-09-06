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

/**
 * Graceful shutdown handler.
 * Handles SIGTERM and SIGINT signals to cleanly close the server
 * and allow in-flight requests to complete before exiting.
 */
function gracefulShutdown(signal: string) {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

  server.close((err) => {
    if (err) {
      console.error("Error during server shutdown:", err);
      process.exit(1);
    }

    console.log("Server closed. All connections drained.");
    process.exit(0);
  });

  // Force exit after 10 seconds if connections haven't drained
  setTimeout(() => {
    console.error("Forced shutdown after timeout. Exiting.");
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
