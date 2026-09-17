import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Configure conservative JSON body size limit to prevent OOM DoS attacks
// Default: 100kb, override with JSON_BODY_LIMIT environment variable
const bodyLimit = process.env.JSON_BODY_LIMIT || "100kb";

app.use(express.json({ limit: bodyLimit }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});