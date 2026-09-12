import express, { type ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";

const jsonErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({
      error: {
        code: "invalid_json",
        message: "Request body must be valid JSON."
      }
    });
    return;
  }

  next(error);
};

export function createApp() {
  const app = express();

  app.use(express.json({ strict: false }));
  app.use(jsonErrorHandler);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  return app;
}
