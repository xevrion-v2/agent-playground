import express from "express";
import { pathToFileURL } from "url";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use((error, _req, res, next) => {
  const parseError = error as Error & { status?: number; body?: unknown };

  if (parseError instanceof SyntaxError && parseError.status === 400 && "body" in parseError) {
    res.status(400).json({ error: "Invalid JSON request body" });
    return;
  }

  next(error);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}

export default app;
