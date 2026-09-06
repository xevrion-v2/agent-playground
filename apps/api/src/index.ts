import express from "express";

import usersRouter from "./routes/users";

function parsePort(value: string | undefined): number {
  if (value === undefined || value === "") return 4000;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0 || n > 65535) {
    throw new Error(`Invalid PORT value: "${value}". Expected an integer between 0 and 65535.`);
  }
  return n;
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
