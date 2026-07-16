import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Retrieve a list of all users.
 *
 * @route GET /
 * @returns {Object} Response with empty data array and status message
 * @returns {Array} response.data - Array of user objects (currently empty)
 * @returns {string} response.message - Status message
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Create a new user account.
 *
 * @route POST /
 * @param {Object} req.body - User data to create
 * @param {string} req.body.name - User's display name
 * @param {string} req.body.email - User's email address
 * @returns {Object} Response with created user data and status message
 * @returns {Object} response.data - Created user object with generated ID
 * @returns {string} response.data.id - Unique user identifier
 * @returns {string} response.message - Status message
 */
router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
