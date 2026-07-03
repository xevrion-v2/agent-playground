import express from "express";
import usersRouter from "./routes/users";

/**
 * Create the Express app without starting the server.
 * Exported for tests to mount on a random port.
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
