import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";

/**
 * Express application instance for the TaskFlow API.
 *
 * This module creates and configures the Express app without starting
 * the HTTP server. This allows the app to be imported in tests or
 * scripts without binding to a port.
 */
const app = express();

// Limit request body size to 100kb to prevent DoS via large payloads
app.use(express.json({ limit: "100kb" }));

/**
 * Health check endpoint.
 * Returns the current status of the API service.
 */
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// 404 handler for unmatched routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
