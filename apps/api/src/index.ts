import express from "express";

import usersRouter from "./routes/users";

function parsePort(value: string | undefined): number {
  if (value === undefined || value.trim() === "") {
    return 4000;
  }

  const port = Number.parseInt(value, 10);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT value: ${value}`);
  }

  return port;
}

const app = express();
const port = parsePort(process.env.PORT);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
