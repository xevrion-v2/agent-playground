import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Configure a conservative JSON body size limit (100kb).
// This prevents denial-of-service attacks via oversized payloads while
// allowing legitimate requests (typical JSON bodies are <10kb).
// The 100kb limit aligns with Express's recommended security practices
// and is sufficient for the TaskFlow API's user and task payloads.
// Override via the JSON_BODY_LIMIT environment variable if needed.
const BODY_LIMIT = process.env.JSON_BODY_LIMIT || "100kb";

app.use(express.json({ limit: BODY_LIMIT }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
