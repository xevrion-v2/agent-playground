import express from "express";

import { errorResponse } from "./errors";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "10kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", data: { service: "taskflow-api", uptime: process.uptime() } });
});

app.use("/users", usersRouter);

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
