import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a placeholder list of users.
 *
 * @route GET /
 * @returns {Object} JSON response with empty data array and placeholder message
 *
 * @example
 * // Response
 * {
 *   "data": [],
 *   "message": "User listing is not implemented yet."
 * }
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user placeholder. Currently echoes back the request body
 * with a stub user ID. Future implementation will validate input,
 * persist to the database, and return the created user record.
 *
 * @route POST /
 * @param {Object} req.body - The user data to create
 * @param {string} req.body.name - The user's display name
 * @param {string} req.body.email - The user's email address
 * @returns {Object} JSON response with status 201 and stub user data
 *
 * @example
 * // Request body
 * { "name": "Jane Doe", "email": "jane@example.com" }
 *
 * // Response
 * {
 *   "data": {
 *     "id": "stub-user-id",
 *     "name": "Jane Doe",
 *     "email": "jane@example.com"
 *   },
 *   "message": "User creation is not implemented yet."
 * }
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
