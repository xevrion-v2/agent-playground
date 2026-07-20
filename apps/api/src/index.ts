import express from "express";

import usersRouter from "./routes/users";

export const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// JSON 404 fallback for unknown API routes
app.use((_req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested API route does not exist."
  });
});

// Only start the server when run directly (not imported for tests)
const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith("index.ts") || process.argv[1].endsWith("index.js")
);
if (isDirectRun || process.env.START_SERVER === "1") {
  app.listen(port, () => {
    console.log(`TaskFlow API listening on port ${port}`);
  });
}
