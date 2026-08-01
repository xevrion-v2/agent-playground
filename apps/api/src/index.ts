import express from "express";
import type { Server } from "node:http";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const shutdownTimeoutMs = 10_000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export function installGracefulShutdown(
  server: Pick<Server, "close">,
  options: {
    signals?: NodeJS.Signals[];
    timeoutMs?: number;
    exit?: (code: number) => never;
    logger?: Pick<typeof console, "log" | "error">;
  } = {},
) {
  const signals = options.signals ?? ["SIGTERM", "SIGINT"];
  const timeoutMs = options.timeoutMs ?? shutdownTimeoutMs;
  const exit = options.exit ?? process.exit;
  const logger = options.logger ?? console;
  let shuttingDown = false;

  const shutdown = (signal: NodeJS.Signals) => {
    if (shuttingDown) {
      return;
    }

    shuttingDown = true;
    logger.log(`Received ${signal}; closing TaskFlow API gracefully`);

    const forcedExit = setTimeout(() => {
      logger.error(`Forced shutdown after ${timeoutMs}ms`);
      exit(1);
    }, timeoutMs);
    forcedExit.unref?.();

    server.close((error?: Error) => {
      clearTimeout(forcedExit);
      if (error) {
        logger.error("TaskFlow API shutdown failed", error);
        return exit(1);
      }

      logger.log("TaskFlow API closed cleanly");
      exit(0);
    });
  };

  for (const signal of signals) {
    process.once(signal, shutdown);
  }

  return shutdown;
}

export function startServer() {
  const server = app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
  installGracefulShutdown(server);
  return server;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
