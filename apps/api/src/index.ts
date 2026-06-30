import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

// Configure JSON parser to accept any JSON type (objects, arrays, strings, numbers, etc)
app.use(express.json({ strict: false }));

// Error handler for JSON parsing errors
app.use((err: any, _req: any, res: any, next: any) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      error: "Request body must be valid JSON"
    });
  }
  next(err);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
