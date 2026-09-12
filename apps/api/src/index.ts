import express from "express";

import usersRouter from "./routes/users";

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", data: { service: "taskflow-api" } });
  });
  app.use("/users", usersRouter);
  return app;
}

const port = process.env.PORT || 4000;
createApp().listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
