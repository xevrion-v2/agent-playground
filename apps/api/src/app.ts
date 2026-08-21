import express from "express";

import usersRouter from "./routes/users";
import { jsonErrorHandler } from "./middleware/jsonErrorHandler";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(jsonErrorHandler);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export { app, port };
