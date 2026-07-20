import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

/**
 * JSON body size limit.
 *
 * Express parses the entire request body into memory before
 * routing it to handlers. Without a limit, a malicious or
 * malformed client could exhaust server memory by sending a
 * gigabyte-sized JSON payload.
 *
 * 100 KB is conservative: it accommodates any realistic user,
 * task, or proposal payload while keeping the ceiling low
 * enough to prevent trivial memory-exhaustion attacks.
 */
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
