import express from "express";
import usersRouter from "./routes/users";
import { installGracefulShutdown, DEFAULT_SHUTDOWN_TIMEOUT_MS } from "./graceful-shutdown";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Health check — returns 503 during graceful shutdown
let isHealthy = true;
app.get("/health", (_req, res) => {
  if (isHealthy) {
    res.json({ status: "ok", service: "taskflow-api" });
  } else {
    res.status(503).json({ status: "shutting-down", service: "taskflow-api" });
  }
});

app.use("/users", usersRouter);

export function startServer() {
  const server = app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });

  const shutdown = installGracefulShutdown(server, {
    timeoutMs: Number(process.env.SHUTDOWN_TIMEOUT_MS) || DEFAULT_SHUTDOWN_TIMEOUT_MS,
    logger: console,
  });

  // Mark health as not-ready when shutdown starts
  shutdown.onHealthNotReady(() => {
    isHealthy = false;
    console.log("Health endpoint marked not-ready");
  });

  return { server, shutdown };
}

// Only call startServer when this is the main module (not during tests)
const isMainModule = process.argv[1] && (
  process.argv[1].endsWith("/index.ts") ||
  process.argv[1].endsWith("/index.js") ||
  process.argv[1] === import.meta?.filename
);

if (isMainModule) {
  startServer();
}
