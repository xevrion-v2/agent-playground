import express from "express";

import usersRouter from "./routes/users";

/** Express application instance. */
const app = express();

/** Server port — reads from `PORT` env var, defaults to 4000. */
const port = process.env.PORT || 4000;

/** Parse incoming JSON request bodies. */
app.use(express.json());

/**
 * GET /health — Health-check endpoint.
 *
 * Returns service status and name. Use this for load-balancer probes
 * or monitoring pings.
 *
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @returns JSON with `status` and `service`
 *
 * @example
 * ```bash
 * curl -X GET http://localhost:4000/health
 * ```
 * ```json
 * {
 *   "status": "ok",
 *   "service": "taskflow-api"
 * }
 * ```
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

/** Mount user-related routes under /users. */
app.use("/users", usersRouter);

/**
 * Start the Express server.
 *
 * Listens on the configured port and logs a confirmation message.
 */
app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
