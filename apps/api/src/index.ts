import express from "express";

import usersRouter from "./routes/users";

export const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Only listen when run directly (not imported for tests)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
