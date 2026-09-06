import express from "express";
import cors from "cors";
import http from "http";

import usersRouter from "./routes/users";

export function createApp(): express.Application {
  const app = express();

  // CORS middleware
  app.use(cors());

  // Disable X-Powered-By header
  app.disable("x-powered-by");

  // Disable ETag generation for dynamic JSON responses
  app.set("etag", false);

  // Basic security headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  // Handle JSON parse errors
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({ error: "Invalid JSON request body" });
      return;
    }
    throw err;
  });

  // JSON 404 for unknown routes
  app.use((_req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  // Global error handler
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error:", err.message);
    res.status(500).json({
      error: "Internal server error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  });

  return app;
}

export function createServer(app: express.Application): http.Server {
  const port = parseInt(process.env.PORT || "4000", 10);
  const server = http.createServer(app);

  // Graceful shutdown
  const FORCE_SHUTDOWN_TIMEOUT = 10000; // 10 seconds

  function shutdown(signal: string) {
    console.log(`Received ${signal}. Starting graceful shutdown...`);

    server.close((err) => {
      if (err) {
        console.error("Error during server close:", err);
        process.exit(1);
      }
      console.log("Server closed gracefully.");
      process.exit(0);
    });

    // Force shutdown after timeout
    setTimeout(() => {
      console.error("Forced shutdown after timeout");
      process.exit(1);
    }, FORCE_SHUTDOWN_TIMEOUT);
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  server.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });

  return server;
}
