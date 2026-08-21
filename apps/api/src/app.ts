import express, { type ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";

export const jsonBodyLimit = "32kb";

const app = express();

app.use(express.json({ limit: jsonBodyLimit }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const jsonBodyLimitHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error?.type === "entity.too.large") {
    res.status(413).json({
      error: `JSON request bodies must be ${jsonBodyLimit} or smaller.`
    });
    return;
  }

  next(error);
};

app.use(jsonBodyLimitHandler);

export default app;
