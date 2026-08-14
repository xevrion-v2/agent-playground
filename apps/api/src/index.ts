import express from "express";

import { getApiPort } from "./config/env";
import usersRouter from "./routes/users";

const app = express();
const port = getApiPort();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
