import express, { type ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(((error, _req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({
      error: "Invalid JSON request body"
    });
    return;
  }

  next(error);
}) satisfies ErrorRequestHandler);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
