import express from "express";

import usersRouter from "./routes/users";

const app = express();
const rawPort = process.env.PORT;
const parsedPort = rawPort !== undefined ? parseInt(rawPort, 10) : NaN;
const port = (rawPort === undefined || isNaN(parsedPort) || parsedPort < 0 || parsedPort > 65535) ? 4000 : parsedPort;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
