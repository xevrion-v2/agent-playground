import express, { type ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";

export const app = express();

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

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
