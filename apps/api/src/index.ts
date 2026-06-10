import express from "express";

import usersRouter from "./routes/users";
import tasksRouter from "./routes/tasks";
import leaderboardRouter from "./routes/leaderboard";

export const app = express();
app.disable("x-powered-by");
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "100kb" }));

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

// Only listen when run directly (not imported for tests)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
