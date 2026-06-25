
import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

const BODY_LIMIT = process.env.BODY_LIMIT ?? "100kb";
app.use(express.json({ limit: BODY_LIMIT }));

/**
 * GET /health
 *
 * Returns a consistent envelope shape with  and .
 * status: "ok" | "degraded" | "error"
 * data: service metadata
 */
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      version: process.env.npm_package_version ?? "unknown",
      uptime: Math.floor(process.uptime()),
    },
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log();
});
