import express from "express";

import usersRouter from "./routes/users";

/**
 * Create and configure the Express application.
 *
 * This module exports the app without starting a server, so it can be
 * imported safely in route tests and other contexts where binding a port
 * is undesirable.
 *
 * @returns A configured Express application instance.
 */
export function createApp(): express.Express {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  return app;
}

/**
 * A default application instance, exported for convenience.
 * Use this when you don't need a fresh app (e.g. in production).
 */
export const app = createApp();
