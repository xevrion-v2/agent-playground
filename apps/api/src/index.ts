import express from "express";

import { API_ROUTES } from "./constants/routes";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get(API_ROUTES.health, (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use(API_ROUTES.users, usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
