import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const startTime = Date.now();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "taskflow-api",
    timestamp: new Date().toISOString(),
    uptimeMs: Date.now() - startTime
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
