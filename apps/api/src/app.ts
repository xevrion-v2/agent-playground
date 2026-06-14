import express from "express";

import usersRouter from "./routes/users";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      data: {
        service: "taskflow-api"
      }
    });
  });

  app.use("/users", usersRouter);

  return app;
}
