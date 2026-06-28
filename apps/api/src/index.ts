import express from "express";

import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message || err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal server error",
      status: err.status || 500
    }
  });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
