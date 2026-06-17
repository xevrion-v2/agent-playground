import express, { type ErrorRequestHandler, type Express, type RequestHandler } from "express";

import usersRouter from "./routes/users";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Route not found" });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("Unhandled API error:", error);

  res.status(500).json({
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && error instanceof Error
      ? { message: error.message }
      : {})
  });
};

export function registerErrorHandlers(app: Express) {
  app.use(notFoundHandler);
  app.use(errorHandler);
}

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);
  registerErrorHandlers(app);

  return app;
}
