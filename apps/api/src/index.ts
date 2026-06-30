import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Configure JSON parser with conservative body size limit (1MB)
app.use(express.json({ limit: "1mb" }));

// Error response helper
const sendError = (res: any, status: number, message: string) => {
  res.status(status).json({ error: message });
};

// Error handler for JSON parsing errors
app.use((err: any, _req: any, res: any, next: any) => {
  if (err instanceof SyntaxError) {
    return sendError(res, 400, "Request body must be valid JSON");
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
