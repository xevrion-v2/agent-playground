
import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Limit JSON request bodies to 100kb to prevent memory exhaustion / DoS.
// Override via BODY_LIMIT env var (e.g. "500kb", "1mb").
const BODY_LIMIT = process.env.BODY_LIMIT ?? "100kb";
app.use(express.json({ limit: BODY_LIMIT }));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    data: { service: "taskflow-api" },
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log();
});
