import express from "express";

import usersRouter from "./routes/users";

export const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.use((err: Error & { type?: string }, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.type === "entity.parse.failed") {
    res.status(400).json({ error: "Request body must be valid JSON." });
    return;
  }

  next(err);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
