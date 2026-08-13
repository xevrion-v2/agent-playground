import express from "express";

import usersRouter from "./routes/users";
import { errorHandler } from "./errorHandler";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Centralized error handler must be registered after all routes
app.use(errorHandler);

app.listen(port, () => {
  console.log("TaskFlow API listening on port " + port);
});
