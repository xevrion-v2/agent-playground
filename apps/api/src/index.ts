import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

/**
 * Standard API response envelope.
 * All route handlers should use this shape for consistency.
 * @interface ApiResponse
 * @property {string} status - Operation status ("ok" | "error").
 * @property {object} [data] - Response payload (present on success).
 * @property {string} [message] - Human-readable status description.
 */
interface ApiResponse<T = unknown> {
  status: "ok" | "error";
  data?: T;
  message?: string;
}

app.get("/health", (_req, res): void => {
  const response: ApiResponse<{ service: string; version: string }> = {
    status: "ok",
    data: {
      service: "taskflow-api",
      version: process.env.npm_package_version ?? "0.1.0"
    },
    message: "Service is healthy"
  };
  res.json(response);
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
