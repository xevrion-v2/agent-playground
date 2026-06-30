import express, { Request, Response } from "express";
import { ApiError, errorResponse } from "./utils/errors";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

app.use("/users", usersRouter);

app.use((req: Request, res: Response) => {
  if (req.path.startsWith("/api") || req.accepts("json") === "json") {
    res.status(404).json({
      error: "Not Found",
      message: `Route ${req.method} ${req.path} not found`,
    });
    return;
  }
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
