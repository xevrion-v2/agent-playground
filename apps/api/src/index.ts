import { createApp } from "./app";
import type { Server } from "http";
import { getPort } from "./config";

const port = getPort(process.env.PORT);
const app = createApp();

const server: Server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

const shutdown = (signal: string) => {
  console.log(`\nReceived ${signal}, starting graceful shutdown...`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Shutdown timeout, forcing exit");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
