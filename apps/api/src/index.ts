import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

/**
 * Maximum allowed request body size.
 * Set to 100kb as a conservative default to prevent oversized payload attacks.
 * @see https://expressjs.com/en/api.html#express.json
 */
const JSON_BODY_LIMIT = "100kb";

app.use(express.json({ limit: JSON_BODY_LIMIT }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
