import express from "express";
import type { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

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
 * Catches errors passed via `next(err)` and returns a consistent JSON response.
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

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
