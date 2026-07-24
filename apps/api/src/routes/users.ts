import { Router } from "express";

const router = Router();

/**
 * GET /
 * Returns a list of all users.
 *
 * @remarks
 * Currently returns a stub response. Full implementation pending.
 *
 * @returns {Object} response - JSON response
 * @returns {Array}  response.data - Array of user objects (currently empty)
 * @returns {string} response.message - Status message
 *
 * @example
 * // Response
 * { "data": [], "message": "User listing is not implemented yet." }
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /
 * Creates a new user with the provided request body.
 *
 * @remarks
 * Currently returns a stub response with the request body echoed back.
 * Full implementation pending.
 *
 * @param {Object} req.body - User data to create
 * @returns {Object} response - JSON response
 * @returns {Object} response.data - Created user object
 * @returns {string} response.data.id - Generated user ID (stub)
 * @returns {string} response.message - Status message
 *
 * @example
 * // Request body
 * { "name": "John Doe", "email": "john@example.com" }
 *
 * // Response
 * { "data": { "id": "stub-user-id", "name": "John Doe", "email": "john@example.com" }, "message": "User creation is not implemented yet." }
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
