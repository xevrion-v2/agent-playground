/**
 * TaskFlow API — Express.js server entry point.
 * 
 * Mounts routes, middleware, and starts the HTTP listener.
 * Environment: PORT (default 4000)
 */
import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

/** GET /health — health check endpoint */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
