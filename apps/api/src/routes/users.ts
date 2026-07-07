import { Router } from "express";

/**
 * User routes router.
 *
 * Provides endpoints for user management:
 * - GET  / — List all users (stub)
 * - POST / — Create a new user (stub)
 */
const router = Router();

/**
 * GET /users
 *
 * Returns a list of all users. Currently returns a stub response
 * indicating the endpoint is not yet implemented.
 *
 * @returns {object} JSON response with an empty data array and a status message.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user with the provided request body fields.
 * Currently returns a stub response with a placeholder user ID.
 *
 * @param {express.Request} req - Express request object containing user data in the body.
 * @returns {object} JSON response with a stub user object and status message. HTTP 201 on success.
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
