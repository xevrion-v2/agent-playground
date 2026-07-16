import express from "express";
import { pathToFileURL } from "node:url";

import usersRouter from "./routes/users";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export function startServer(port = process.env.PORT || 4000) {
  return app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer();
}

export default app;
