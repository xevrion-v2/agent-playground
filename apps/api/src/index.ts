import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Disable Express's default ETag generation. Dynamic JSON endpoints such as
// /health and /users represent current service state, so they should not
// emit a validator header that could turn into a 304 Not Modified for a
// stale response.
app.set("etag", false);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
