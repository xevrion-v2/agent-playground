import express from "express";
import type { Server } from "node:http";

import usersRouter from "./routes/users";

const app = express();
const shutdownTimeoutMs = 10_000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

type Exit = (code?: number) => never | void;
type Logger = Pick<Console, "error" | "log">;
type Signal = "SIGINT" | "SIGTERM";
type SetExitCode = (code: number) => void;

interface ShutdownOptions {
  exit?: Exit;
  logger?: Logger;
  setExitCode?: SetExitCode;
  timeoutMs?: number;
}

interface StartOptions extends ShutdownOptions {
  port?: number | string;
}

export function createGracefulShutdown(
  server: Server,
  {
    exit = process.exit,
    logger = console,
    setExitCode = (code) => {
      process.exitCode = code;
    },
    timeoutMs = shutdownTimeoutMs
  }: ShutdownOptions = {}
) {
  let shuttingDown = false;

  return (signal: Signal) => {
    if (shuttingDown) {
      return;
    }

    shuttingDown = true;
    logger.log(`Received ${signal}; draining TaskFlow API server`);

    const forceExitTimer = setTimeout(() => {
      logger.error("Graceful shutdown timed out; forcing exit");
      exit(1);
    }, timeoutMs);
    forceExitTimer.unref();

    server.close((error?: Error) => {
      clearTimeout(forceExitTimer);

      if (error) {
        logger.error("Error while closing TaskFlow API server", error);
        exit(1);
        return;
      }

      logger.log("TaskFlow API server closed cleanly");
      setExitCode(0);
    });
  };
}

export function startServer({ port: listenPort = process.env.PORT || 4000, ...shutdownOptions }: StartOptions = {}) {
  const server = app.listen(listenPort, () => {
    console.log(`TaskFlow API listening on port ${listenPort}`);
  });

  const ready = server.listening
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        server.once("listening", resolve);
      });

  const shutdown = createGracefulShutdown(server, shutdownOptions);
  const onSigterm = () => shutdown("SIGTERM");
  const onSigint = () => shutdown("SIGINT");

  process.once("SIGTERM", onSigterm);
  process.once("SIGINT", onSigint);

  const disposeSignalHandlers = () => {
    process.off("SIGTERM", onSigterm);
    process.off("SIGINT", onSigint);
  };

  return { disposeSignalHandlers, ready, server, shutdown };
}

export { app };
