import { Router } from "express";

/**
 * Express router for user-related endpoints.
 *
 * Provides routes for listing and creating users.
 * Currently returns stub responses since full user service
 * integration is not yet implemented.
 */
const router = Router();

/**
 * Handles GET requests to retrieve a list of users.
 *
 * @route GET /
 * @returns {Object} JSON response containing an empty user list and a not-implemented message.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Handles POST requests to create a new user.
 *
 * @route POST /
 * @param {Object} req.body - The user data from the request body.
 * @returns {Object} JSON response containing the created user stub and a not-implemented message.
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
