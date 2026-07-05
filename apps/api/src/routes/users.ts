import { Router } from "express";

const router = Router();

/**
 * GET /api/users
 * Retrieves a list of all users.
 *
 * @returns {Object} Response object containing:
 *   - data: Array of user objects (currently empty)
 *   - message: Status message
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /api/users
 * Creates a new user with the provided data.
 *
 * @param {Object} req.body - User data to create
 * @param {string} req.body.id - User ID (optional, auto-generated if not provided)
 * @returns {Object} Response object containing:
 *   - data: Created user object with generated or provided ID
 *   - message: Status message
 * @status 201 - User created successfully
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
