import express from "express";

import { sendApiError } from "./lib/apiError.js";
import usersRouter from "./routes/users.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      healthy: true,
    },
    message: "Service is healthy.",
  });
});

app.use("/users", usersRouter);

app.use((_req, res) => {
  sendApiError(res, 404, "Route not found.");
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
