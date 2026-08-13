import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

const startTime = Date.now();

app.use(express.json());

app.get("/health", (_req, res) => {
  const uptimeSeconds = (Date.now() - startTime) / 1000;
  res.json({
    status: "ok",
    data: {
      service: "taskflow-api",
      uptime: uptimeSeconds,
      timestamp: new Date().toISOString()
    }
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
