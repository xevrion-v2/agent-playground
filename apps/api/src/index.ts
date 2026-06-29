import express from "express";
import { apiError } from "./utils/errors";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", data: { service: "taskflow-api" } });
});

// Demo: use apiError helper
app.get("/health/error", (_req, res) => {
  res.status(503).json(apiError(503, "Service temporarily unavailable"));
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
