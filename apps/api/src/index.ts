import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Configure JSON parser with conservative body size limit (1MB)
// This prevents abuse from large request bodies while allowing normal operations
app.use(express.json({ limit: "1mb" }));

// Error handler for JSON parsing errors (non-object bodies)
app.use((err: any, _req: any, res: any, next: any) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: "Request body must be valid JSON"
    });
  }
  next(err);
});

// Health check endpoint with normalized response envelope
app.get("/health", (_req, res) => {
  res.json({
    data: {
      status: "ok",
      service: "taskflow-api"
    },
    message: "Health check passed"
  });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
