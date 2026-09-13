import { Router } from "express";

/**
 * Express router for user-related endpoints.
 *
 * Provides stub implementations for listing and creating users.
 * Currently returns hardcoded responses — will be connected to a
 * database in a future iteration.
 *
 * @example
 * ```ts
 * import usersRouter from "./routes/users";
 * app.use("/users", usersRouter);
 * // Now available: GET /users, POST /users
 * ```
 */
const router = Router();

/**
 * GET /users — List all users.
 *
 * Returns an empty array with an informational message.
 * This endpoint is a stub and does not query a database yet.
 *
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @returns JSON with `data` (empty array) and `message`
 *
 * @example
 * ```bash
 * curl -X GET http://localhost:4000/users
 * ```
 * ```json
 * {
 *   "data": [],
 *   "message": "User listing is not implemented yet."
 * }
 * ```
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users — Create a new user.
 *
 * Accepts a JSON body and returns it with a stub ID.
 * This endpoint is a stub and does not persist data yet.
 *
 * @param req - Express request object containing user data in `req.body`
 * @param res - Express response object
 * @returns JSON with `data` (created user) and `message`, status 201
 *
 * @example
 * ```bash
 * curl -X POST http://localhost:4000/users \
 *   -H "Content-Type: application/json" \
 *   -d '{"name": "Maria Silva", "email": "maria@example.com"}'
 * ```
 * ```json
 * {
 *   "data": {
 *     "id": "stub-user-id",
 *     "name": "Maria Silva",
 *     "email": "maria@example.com"
 *   },
 *   "message": "User creation is not implemented yet."
 * }
 * ```
 */
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
