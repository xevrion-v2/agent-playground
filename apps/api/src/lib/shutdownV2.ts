import { Server } from "http";
export function setupGracefulShutdown(server: Server, timeoutMs = 10000): void {
  const shutdown = (sig: string): void => {
    console.log(`[${sig}] graceful shutdown initiated`);
    server.close(() => { console.log("server closed"); process.exit(0); });
    setTimeout(() => { console.error("shutdown timeout"); process.exit(1); }, timeoutMs).unref();
  };
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT",  () => shutdown("SIGINT"));
}
export default setupGracefulShutdown;
