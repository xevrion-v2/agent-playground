import express from "express";

import usersRouter from "./routes/users";

function parsePort(value: string | undefined): number {
  if (value === undefined) return 4000;
  const port = parseInt(value, 10);
  if (isNaN(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT: ${value}. Must be a number between 0 and 65535.`);
  }
  return port;
}

const app = express();
const port = parsePort(process.env.PORT);

// Disable X-Powered-By header
app.disable("x-powered-by");

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

// 404 handler
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

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

export default app;
