import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieves a list of all users.
 * 
 * @returns {Object} Response object containing:
 *   - data {Array} Array of user objects (currently empty)
 *   - message {string} Status message
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided data.
 * 
 * @param {Object} req.body - User data to create
 * @returns {Object} Response object containing:
 *   - data {Object} Created user object with generated ID
 *   - message {string} Status message
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
