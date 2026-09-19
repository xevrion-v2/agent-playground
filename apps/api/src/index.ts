import express from "express";

import usersRouter from "./routes/users";
import tasksRouter from "./routes/tasks";
import leaderboardRouter from "./routes/leaderboard";
import { sendError } from "./errorHandler";

const app = express();
const port = process.env.PORT || 4000;

// Conservative JSON body size limit (100 KB) to prevent memory exhaustion
app.use(express.json({ limit: "100kb" }));

// Health check — consistent envelope with status and data fields
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      version: "0.1.0",
      uptime: process.uptime(),
    },
  });
});

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/leaderboard", leaderboardRouter);

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : "Internal server error";
  sendError(res, 500, message);
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});

export { app, sendError };
