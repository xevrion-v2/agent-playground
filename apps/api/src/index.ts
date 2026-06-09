import express, { Application, Request, Response } from "express";

import usersRouter from "./routes/users";

/**
 * Main Express application instance for TaskFlow API.
 * @description Initializes and configures the Express server with middleware and routes.
 */
const app: Application = express();

/**
 * Server port configuration.
 * @description Defaults to port 4000 if not specified via environment variable.
 */
const port = process.env.PORT || 4000;

app.use(express.json());

/**
 * Health check endpoint for monitoring service availability.
 * @param _req - Express request object
 * @param res - Express response object
 * @returns JSON response with service status
 */
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
