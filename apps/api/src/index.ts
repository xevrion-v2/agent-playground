import express from "express";

import usersRouter from "./routes/users.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  return app;
}

// Only start listening when this file is the entry point, not when imported from tests
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  const app = createApp();
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
