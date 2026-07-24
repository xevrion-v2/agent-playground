import express from "express";
import usersRouter from "./routes/users";

const app = express();
app.use(express.json());

// JSON syntax error handler middleware
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    return res.status(400).json({
      error: "Request body must be a JSON object."
    });
  }
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

export default app;
