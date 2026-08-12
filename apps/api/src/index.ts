import express from "express";

import usersRouter from "./routes/users";
import { notFoundHandler, globalErrorHandler } from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Error handling middleware (must have 4 parameters)
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
