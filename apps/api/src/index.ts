import express from "express";

import { JSON_BODY_LIMIT } from "./config";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: JSON_BODY_LIMIT }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api", jsonBodyLimit: JSON_BODY_LIMIT });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
