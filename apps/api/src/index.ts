import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Centralized error handling middleware
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({
    status: "error",
    data: null,
    message: err.message || "Internal server error"
  });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
