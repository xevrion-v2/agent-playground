import express from "express";
import type { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

// Parse JSON request bodies with a conservative size limit (100 KB).
app.use(express.json({ limit: "100kb" }));

// ---------------------------------------------------------------------------
// Error handling helpers
// ---------------------------------------------------------------------------

/**
 * Create a standardized API error response.
 *
 * @param status  - HTTP status code.
 * @param message - Human-readable error description.
 * @returns A JSON-serializable error object.
 */
export function apiError(status: number, message: string) {
  return { error: true, status, message };
}

/**
 * Express error-handling middleware.
 *
 * Catches errors thrown or passed via `next(err)` and returns a
 * consistent JSON error response.
 */
function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error("[api] Unhandled error:", err);
  res.status(500).json(apiError(500, "Internal server error"));
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * GET /health
 *
 * Returns a health-check response with a consistent envelope:
 * `{ status, data }`.
 */
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    data: { service: "taskflow-api", uptime: process.uptime() },
  });
});

app.use("/users", usersRouter);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
