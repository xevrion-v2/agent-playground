import express from "express";

import usersRouter from "./routes/users";
import { sendError } from "./lib/http";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.use((_req, res) => {
  sendError(res, 404, "Route not found.");
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
