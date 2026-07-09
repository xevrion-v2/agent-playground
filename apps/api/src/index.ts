import express from "express";

import usersRouter from "./routes/users";
import { errorResponse } from "./utils/errorResponse";

const app = express();
const port = process.env.PORT || 4000;

// #9 — Configure a conservative JSON body size limit (1MB)
app.use(express.json({ limit: "1mb" }));

// #8 — Normalized health check with consistent envelope
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

app.use("/users", usersRouter);

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (err.type === "entity.too.large") {
      res.status(413).json(errorResponse(413, "Request body exceeds the 1MB size limit"));
      return;
    }
    console.error("Unhandled error:", err.message);
    res.status(500).json(errorResponse(500, "Internal server error"));
  }
);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
