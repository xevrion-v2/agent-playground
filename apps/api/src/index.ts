import express, { type ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

type JsonParseError = SyntaxError & {
  status?: number;
  type?: string;
};

function isMalformedJsonError(error: unknown): error is JsonParseError {
  return (
    error instanceof SyntaxError &&
    typeof error === "object" &&
    error !== null &&
    (error as JsonParseError).status === 400 &&
    (error as JsonParseError).type === "entity.parse.failed"
  );
}

const malformedJsonErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (isMalformedJsonError(err)) {
    res.status(400).json({ error: "Invalid JSON request body" });
    return;
  }

  next(err);
};

app.use(express.json());
app.use(malformedJsonErrorHandler);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export const server = app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
