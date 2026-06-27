import type { Server } from "node:http";

type ExitFunction = (code: number) => never | void;
type Logger = Pick<Console, "error" | "log">;

export function createShutdownHandler({
  exit = process.exit,
  logger = console,
  server,
  timeoutMs
}: {
  exit?: ExitFunction;
  logger?: Logger;
  server: Server;
  timeoutMs: number;
}) {
  let isShuttingDown = false;

  return (signal: NodeJS.Signals) => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    logger.log(`Received ${signal}; closing TaskFlow API server.`);

    const forceExit = setTimeout(() => {
      logger.error(`Forced shutdown after ${timeoutMs}ms.`);
      exit(1);
    }, timeoutMs);

    forceExit.unref();

    server.close((error) => {
      clearTimeout(forceExit);

      if (error) {
        logger.error("TaskFlow API shutdown failed.", error);
        exit(1);
        return;
      }

      logger.log("TaskFlow API server closed.");
      exit(0);
    });
  };
}
