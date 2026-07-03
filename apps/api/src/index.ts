import express from "express";

import { apiRoutes } from "./constants/routes";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get(apiRoutes.health, (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use(apiRoutes.users, usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
