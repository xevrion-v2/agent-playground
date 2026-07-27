import type { Server } from "node:http";
import type { Socket } from "node:net";

export interface GracefulShutdownOptions {
  signals?: NodeJS.Signals[];
  timeoutMs?: number;
  healthCheck?: boolean;
  exit?: (code: number) => never;
  logger?: Pick<typeof console, "log" | "error" | "warn">;
}

export interface GracefulShutdownInstance {
  /** Manually trigger shutdown */
  shutdown: (signal: NodeJS.Signals) => void;
  /** Whether the server is currently shutting down */
  isShuttingDown: () => boolean;
  /** Register a callback that the health layer checks during shutdown */
  onHealthNotReady: (cb: () => void) => void;
  /** Cleanup: remove signal handlers */
  remove: () => void;
}

export const DEFAULT_SHUTDOWN_TIMEOUT_MS = 10_000;
export const DEFAULT_SIGNALS: NodeJS.Signals[] = ["SIGTERM", "SIGINT"];

/**
 * Installs graceful shutdown on an HTTP server with active connection tracking.
 *
 * Beyond basic server.close() this implementation:
 * - Tracks all active socket connections to drain in-flight requests
 * - Provides onHealthNotReady callback so /health can return 503 during drain
 * - Forces hard shutdown after configurable timeout
 * - Deduplicates multiple signals
 * - Supports signal handler cleanup (for testing)
 */
export function installGracefulShutdown(
  server: Server,
  options: GracefulShutdownOptions = {},
): GracefulShutdownInstance {
  const {
    signals = DEFAULT_SIGNALS,
    timeoutMs = DEFAULT_SHUTDOWN_TIMEOUT_MS,
    exit = process.exit.bind(process),
    logger = console,
  } = options;

  let shuttingDown = false;
  const activeConnections = new Set<Socket>();
  let onHealthDrain: (() => void) | null = null;

  // Track active connections
  server.on("connection", (socket: Socket) => {
    activeConnections.add(socket);
    socket.once("close", () => {
      activeConnections.delete(socket);
    });
  });

  function onHealthNotReady(cb: () => void) {
    onHealthDrain = cb;
  }

  function doShutdown(signal: NodeJS.Signals): void {
    if (shuttingDown) return;
    shuttingDown = true;

    logger.log(`Received ${signal}; starting graceful shutdown`);

    // Mark health as not ready
    onHealthDrain?.();

    // Stop accepting new connections
    server.close((error?: Error) => {
      if (error) {
        logger.error("Server close error:", error.message);
      }
    });

    // Forced hard shutdown timer
    const forceTimer = setTimeout(() => {
      const remaining = activeConnections.size;
      if (remaining > 0) {
        logger.warn(
          `Forced shutdown after ${timeoutMs}ms; ` +
            `${remaining} connection(s) still active`,
        );
      } else {
        logger.error(`Forced shutdown after ${timeoutMs}ms`);
      }
      exit(1);
    }, timeoutMs);
    forceTimer.unref();

    // Drain actively
    const drainConnections = () => {
      if (activeConnections.size === 0) {
        clearTimeout(forceTimer);
        logger.log("All connections drained; exiting cleanly");
        exit(0);
      } else {
        logger.log(
          `Waiting for ${activeConnections.size} active connection(s)...`,
        );
        for (const socket of activeConnections) {
          if (!socket.writableEnded) {
            socket.end();
          }
        }
        setTimeout(drainConnections, 500).unref();
      }
    };

    setTimeout(drainConnections, 100).unref();
  }

  const handlerMap = new Map<NodeJS.Signals, typeof doShutdown>();

  for (const signal of signals) {
    const handler = doShutdown.bind(null, signal);
    handlerMap.set(signal, handler);
    process.on(signal, handler);
  }

  return {
    shutdown: doShutdown,
    isShuttingDown: () => shuttingDown,
    onHealthNotReady,
    remove() {
      for (const [sig, handler] of handlerMap) {
        process.off(sig, handler);
      }
      handlerMap.clear();
    },
  };
}
