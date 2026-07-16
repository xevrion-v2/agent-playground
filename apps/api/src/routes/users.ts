import { Router } from "express";

const router = Router();

/**
 * Get user listing.
 * @route GET /api/users
 * @returns {object} 200 - Empty array of users and status message
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user.
 * @route POST /api/users
 * @param {object} req.body - User details to register
 * @returns {object} 201 - User stub object and success message
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
