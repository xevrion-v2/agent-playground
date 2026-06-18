import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieve a list of all users.
 * @route GET /users
 * @returns {Object} JSON with empty data array and placeholder message
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Create a new user.
 * @route POST /users
 * @param {Object} req.body - User data to create
 * @returns {Object} JSON with stub user data including provided body
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
