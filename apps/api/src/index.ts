import { pathToFileURL } from "node:url";

import express from "express";

import usersRouter from "./routes/users";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "taskflow-api" });
  });

  app.use("/users", usersRouter);

  return app;
}

export const app = createApp();

export function startServer(port = process.env.PORT || 4000) {
  return app.listen(port, () => {
    console.log("TaskFlow API listening on port " + port);
  });
}

const entrypointPath = process.argv[1];

if (entrypointPath && import.meta.url === pathToFileURL(entrypointPath).href) {
  startServer();
}
