import express from "express";

import usersRouter from "./routes/users.js";

export const JSON_BODY_LIMIT = "100kb";

const app = express();

app.use(express.json({ limit: JSON_BODY_LIMIT }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export default app;
