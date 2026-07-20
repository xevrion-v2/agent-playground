import express from "express";

import usersRouter from "./routes/users";
import { errorHandler } from "./errors";

const app = express();
const port = process.env.PORT || 4000;

// Limit request body to 1 MB to prevent abuse
app.use(express.json({ limit: "1mb" }));

// Normalised health check response
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "taskflow-api",
    version: process.env.npm_package_version ?? "0.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/users", usersRouter);

// Centralised error handler (must be registered last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
