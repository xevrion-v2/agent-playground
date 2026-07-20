import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import piRouter from "./routes/pi.js";

export function createApp() {
  const app = express();

  // Disable Express X-Powered-By header
  app.disable("x-powered-by");

  // Disable ETag generation for dynamic JSON responses
  app.set("etag", false);

  // Enable CORS for cross-origin requests
  app.use(cors());

  // Handle malformed JSON bodies with JSON error response
  app.use(express.json({ limit: "100kb" }), (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      return res.status(400).json({ error: "Invalid JSON request body" });
    }
    return _next(err);
  });

  // Health check endpoint with no-cache policy
  app.get("/health", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({
      status: "ok",
      data: {
        service: "taskflow-api",
        timestamp: new Date().toISOString()
      }
    });
  });

  app.use("/users", usersRouter);
  app.use("/pi", piRouter);

  return app;
}
