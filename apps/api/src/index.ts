import express from "express";

import usersRouter from "./routes/users";

/**
 * @module TaskFlowAPI
 * @description Main entry point for the TaskFlow API server.
 * Initializes Express application, configures middleware, and mounts route handlers.
 */

const app = express();

/**
 * @constant {number|string} port - The port number the server listens on.
 * Defaults to 4000 if the PORT environment variable is not set.
 */
const port = process.env.PORT || 4000;

/** Parse incoming JSON request bodies */
app.use(express.json());

/**
 * GET /health
 * @description Health check endpoint for monitoring and load balancer probes.
 * Returns the current service status and service name.
 * @route {GET} /health
 * @returns {Object} 200 - Health status response
 * @returns {string} response.status - Current health status ("ok")
 * @returns {string} response.service - Service identifier ("taskflow-api")
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "taskflow-api" });
});

/**
 * Mount user routes under the /users path prefix.
 * @see module:UserRoutes
 */
app.use("/users", usersRouter);

/**
 * Start the Express server and listen for incoming connections.
 * Logs the port number to stdout on successful startup.
 */
app.listen(port, () => {
  console.log(`TaskFlow API listening on port ${port}`);
});
