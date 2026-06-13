import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Limit incoming JSON bodies to prevent memory abuse.
// Override via JSON_BODY_LIMIT env var (e.g. "200kb", "1mb").
const bodyLimit = process.env.JSON_BODY_LIMIT || "100kb";
app.use(express.json({ limit: bodyLimit }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
