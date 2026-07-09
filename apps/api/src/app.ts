import express, { type Express } from "express";

import usersRouter from "./routes/users.js";

/**
 * Build the TaskFlow API Express app without binding to a port.
 *
 * Extracted so tests can mount the app on a free port via supertest
 * without spawning a real listener.
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      data: {
        service: "taskflow-api",
      },
    });
  });

  app.use("/users", usersRouter);

  return app;
}
