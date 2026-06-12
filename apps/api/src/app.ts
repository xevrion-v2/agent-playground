import express from "express";
import usersRouter from "./routes/users";
import piRouter from "./routes/pi";

export function createApp() {
  const app = express();

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
