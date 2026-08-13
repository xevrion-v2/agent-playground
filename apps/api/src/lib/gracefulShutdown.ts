import { Server } from "http";

export function gracefulShutdown(server: Server, timeoutMs = 10000): void {
  const shutdown = (sig: string) => {
    console.log(sig + ": shutting down gracefully");
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), timeoutMs).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

export default gracefulShutdown;
