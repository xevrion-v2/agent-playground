import express from "express";

import usersRouter from "./routes/users.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  app.use((_req, res) => {
    res.status(404).json({
      status: "error",
      error: "Route not found",
      data: null,
    });
  });

  return app;
}

export default createApp();
