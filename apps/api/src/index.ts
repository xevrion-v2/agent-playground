import express, { type Request, type Response } from "express";

import usersRouter from "./routes/users";
import { apiError } from "./lib/apiError";

const app = express();
const port = process.env.PORT || 4000;

// Conservative JSON body size limit: 100kb. Rejects oversized payloads early
// with a clear 413 instead of buffering them.
const JSON_BODY_LIMIT = "100kb";
app.use(express.json({ limit: JSON_BODY_LIMIT }));

app.get("/health", (_req, res) => {
  // Consistent envelope: status + data.
  res.json({ status: "ok", data: { service: "taskflow-api" } });
});

// Example usage of the shared error helper from a real route.
app.use("/users", usersRouter);

// Centralized fallback for JSON parse / payload-too-large errors.
app.use(
  (
    err: Error & { status?: number; type?: string },
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: import("express").NextFunction,
  ) => {
    if (err.type === "entity.too.large") {
      return apiError(res, 413, `Request body exceeds the ${JSON_BODY_LIMIT} limit.`, "PAYLOAD_TOO_LARGE");
    }
    if (err.type === "entity.parse.failed") {
      return apiError(res, 400, "Invalid JSON in request body.", "INVALID_JSON");
    }
    return apiError(res, 500, "Internal server error.", "INTERNAL");
  },
);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

export default app;
