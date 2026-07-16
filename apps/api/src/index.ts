import express from "express";
import { fileURLToPath } from "url";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

// Only start listening when this file is run directly (not imported for tests)
if (isMainModule) {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

export { app };
