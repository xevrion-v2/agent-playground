import express, { type ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const jsonParseErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      error: "Malformed JSON request body."
    });
    return;
  }

  next(err);
};

app.use(jsonParseErrorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
