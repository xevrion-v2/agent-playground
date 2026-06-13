import express from "express";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./utils/errors";
import usersRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "success",
    data: { status: "ok", service: "taskflow-api" }
  });
});

app.use("/users", usersRouter);

// Global error handler (must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});