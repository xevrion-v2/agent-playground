import { fileURLToPath } from "node:url";
import express, { NextFunction, Request, Response } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// Convert express.json() parse failures into a JSON 400 response so API
// clients see a consistent shape and can be asserted in route smoke tests.
app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (
    typeof err === "object" &&
    err !== null &&
    (err as { type?: string }).type === "entity.parse.failed"
  ) {
    return res.status(400).json({ error: "Invalid JSON request body" });
  }
  return next(err);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

export { app };
