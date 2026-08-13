import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const JSON_BODY_LIMIT = process.env.JSON_BODY_LIMIT || "10kb";

app.disable("x-powered-by");
app.set("etag", false);
app.use(cors());
app.use(express.json({ limit: JSON_BODY_LIMIT }));

app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && Object.prototype.hasOwnProperty.call(err, "body")) {
    return res.status(400).json({ error: "Invalid JSON request body" });
  }
  return next(err);
});

app.get("/health", (_req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ status: "ok", service: "taskflow-api", jsonBodyLimit: JSON_BODY_LIMIT });
});

app.use("/users", usersRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

function shutdown(signal: string) {
  console.log(`Received ${signal}, closing server...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
