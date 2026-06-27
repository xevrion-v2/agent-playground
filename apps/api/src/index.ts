import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";

import usersRouter from "./routes/users";

export const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export function startServer() {
  return app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

const entrypoint = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (entrypoint === fileURLToPath(import.meta.url)) {
  startServer();
}
