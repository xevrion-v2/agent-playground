import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Disable ETag generation for dynamic JSON responses
app.disable("etag");

app.use(express.json());

app.get("/health", (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Handle JSON parse errors
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Invalid JSON request body" });
    return;
  }
  throw err;
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
