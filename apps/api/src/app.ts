import express, { type NextFunction, type Request, type Response } from "express";

import usersRouter from "./routes/users";

export const jsonBodyLimit = process.env.JSON_BODY_LIMIT || "100kb";

type ExpressParserError = Error & {
  status?: number;
  statusCode?: number;
  type?: string;
};

function isBodyTooLargeError(error: unknown): error is ExpressParserError {
  if (!(error instanceof Error)) {
    return false;
  }

  const parserError = error as ExpressParserError;
  return (
    parserError.type === "entity.too.large" ||
    parserError.status === 413 ||
    parserError.statusCode === 413
  );
}

export function createApp() {
  const app = express();

  app.use(express.json({ limit: jsonBodyLimit }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (!isBodyTooLargeError(error)) {
      next(error);
      return;
    }

    res.status(413).json({
      error: "Request body too large",
      limit: jsonBodyLimit
    });
  });

  return app;
}
