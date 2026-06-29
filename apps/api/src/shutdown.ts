import type { Server } from "node:http";

type SignalName = "SIGTERM" | "SIGINT";
type SignalTarget = {
  once(signal: SignalName, listener: () => void): unknown;
  removeListener(signal: SignalName, listener: () => void): unknown;
};
type TimeoutHandle = unknown;

export type ShutdownOptions = {
  exit?: (code: number) => void;
  logger?: Pick<Console, "error" | "log">;
  signals?: SignalName[];
  signalTarget?: SignalTarget;
  timeoutMs?: number;
  setShutdownTimeout?: (callback: () => void, timeoutMs: number) => TimeoutHandle;
  clearShutdownTimeout?: (handle: TimeoutHandle) => void;
};

const DEFAULT_SHUTDOWN_TIMEOUT_MS = 10_000;

export function registerGracefulShutdown(
  server: Server,
  options: ShutdownOptions = {}
): () => void {
  const {
    clearShutdownTimeout = (handle) =>
      clearTimeout(handle as ReturnType<typeof setTimeout>),
    exit = process.exit,
    logger = console,
    setShutdownTimeout = setTimeout,
    signalTarget = process,
    signals = ["SIGTERM", "SIGINT"],
    timeoutMs = DEFAULT_SHUTDOWN_TIMEOUT_MS
  } = options;
  let isShuttingDown = false;
  const listeners = new Map<SignalName, () => void>();

  const shutdown = (signal: SignalName) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    logger.log(`Received ${signal}; closing API server`);

    const forcedExitTimer = setShutdownTimeout(() => {
      logger.error(`Forced shutdown after ${timeoutMs}ms`);
      exit(1);
    }, timeoutMs);
    if (
      typeof forcedExitTimer === "object" &&
      forcedExitTimer !== null &&
      "unref" in forcedExitTimer &&
      typeof forcedExitTimer.unref === "function"
    ) {
      forcedExitTimer.unref();
    }

    server.close((error?: Error) => {
      clearShutdownTimeout(forcedExitTimer);

      if (error) {
        logger.error("API server shutdown failed", error);
        exit(1);
        return;
      }

      logger.log("API server closed cleanly");
      exit(0);
    });
  };

  for (const signal of signals) {
    const listener = () => shutdown(signal);
    listeners.set(signal, listener);
    signalTarget.once(signal, listener);
  }

  return () => {
    for (const [signal, listener] of listeners) {
      signalTarget.removeListener(signal, listener);
    }
  };
}
