import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// 404 handler for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ status: "error", error: { message: "Route not found" } });
});

// Global error handling middleware (must have 4 parameters)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    status: "error",
    error: {
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { details: err.message }),
    },
  });
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
