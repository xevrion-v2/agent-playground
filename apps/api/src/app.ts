import express, { type NextFunction, type Request, type Response } from "express";

import usersRouter from "./routes/users";

const app = express();

app.use(express.json({ strict: false }));

app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ error: "Request body must be valid JSON." });
    return;
  }

  next(error);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export default app;
