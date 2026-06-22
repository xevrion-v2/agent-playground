import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Disable Express powered-by header
app.disable("x-powered-by");

// Disable weak ETags for API JSON responses
app.disable("etag");

// Request body size limit (100 KB)
app.use(express.json({ limit: "100kb" }));

/**
 * Health check endpoint — marked non-cacheable to prevent stale status reports.
 */
app.get("/health", (_req: Request, res: Response) => {
  res.set("Cache-Control", "no-store");
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

/**
 * JSON 404 catch-all for unknown API routes.
 * Must be placed after all route handlers.
 */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: "Not Found"
    }
  });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
