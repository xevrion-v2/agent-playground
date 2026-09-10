import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieves a list of all users.
 * @returns {Object} JSON response with user data array and status message.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided details.
 * @param {Object} req.body - User data to create.
 * @returns {Object} JSON response with created user object (with stub ID) and status message.
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
