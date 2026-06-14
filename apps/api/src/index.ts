import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;
const defaultJsonBodyLimit = "100kb";
const maxJsonBodyLimitBytes = 1024 * 1024;

function getJsonBodyLimit(value: string | undefined) {
  if (!value) {
    return defaultJsonBodyLimit;
  }

  const normalizedValue = value.trim().toLowerCase();
  const match = normalizedValue.match(/^(\d+)(b|kb|mb)$/);

  if (!match) {
    return defaultJsonBodyLimit;
  }

  const amount = Number(match[1]);
  const unit = match[2];
  const multiplier = unit === "mb" ? 1024 * 1024 : unit === "kb" ? 1024 : 1;
  const limitBytes = amount * multiplier;

  if (!Number.isSafeInteger(amount) || amount <= 0 || limitBytes > maxJsonBodyLimitBytes) {
    return defaultJsonBodyLimit;
  }

  return normalizedValue;
}

const jsonBodyLimit = getJsonBodyLimit(process.env.JSON_BODY_LIMIT);

app.use(express.json({ limit: jsonBodyLimit }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
