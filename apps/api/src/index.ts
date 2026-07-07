import express from "express";

import usersRouter from "./routes/users";
import { AppError, sendError } from "./lib/errors";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      uptime: process.uptime()
    }
  });
});

app.use("/users", usersRouter);

// Global error handler
app.use((err: unknown, _req: any, res: any, _next: any) => {
  sendError(res, err);
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
