import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";
import { ApiError, sendErrorResponse } from "./helpers/apiError";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

// Global error handling middleware using ApiError
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    sendErrorResponse(res, err.statusCode, err.message);
  } else {
    console.error("Unhandled error:", err);
    sendErrorResponse(res, 500, "Internal server error");
  }
});

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
