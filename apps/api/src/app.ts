import express from "express";

import usersRouter from "./routes/users";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export default app;
