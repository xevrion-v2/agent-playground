import express from "express";

import usersRouter from "./routes/users";
import { getPort } from "./config";

const app = express();
const port = getPort(process.env);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
