import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

/**
 * Configure JSON body parser with a conservative size limit.
 *
 * The 100 KB limit protects the API from oversized payloads that could
 * exhaust server memory or be used in denial-of-service attacks.
 * Requests exceeding this limit will receive a 413 Payload Too Large
 * response automatically from Express.
 */
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
