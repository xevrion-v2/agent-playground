import express, { type ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Focused error middleware for express.json() parse failures.
// Returns a JSON 400 instead of Express's default HTML error page so API
// clients can parse the response and route smoke tests can assert shape.
// Non-SyntaxError errors fall through to any later error handler.
const jsonParseErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Invalid JSON request body" });
    return;
  }

  next(err);
};

app.use(jsonParseErrorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
