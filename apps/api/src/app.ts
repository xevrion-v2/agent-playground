import express from "express";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// JSON 404 fallback for unknown API routes
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;