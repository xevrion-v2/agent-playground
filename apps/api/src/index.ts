import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Conservative default protects against oversized JSON payload DoS.
// Override with JSON_BODY_LIMIT (e.g. "50kb", "1mb") when needed.
const JSON_BODY_LIMIT = process.env.JSON_BODY_LIMIT ?? "100kb";
app.use(express.json({ limit: JSON_BODY_LIMIT }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
