import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// JSON 404 fallback for unknown routes
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Not found." });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
