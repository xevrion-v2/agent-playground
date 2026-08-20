import { Router } from "express";

const router = Router();

/**
 * List all users.
 *
 * @route GET /users
 * @returns {object} 200 - An object containing the list of users
 * @returns {Array}  .data - Array of user objects
 * @returns {string} .message - Status message for the request
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user.
 *
 * @route POST /users
 * @param {object} req.body - The user payload to create
 * @returns {object} 201 - An object containing the created user
 * @returns {object} .data - The created user object (stubbed)
 * @returns {string} .message - Status message for the request
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
