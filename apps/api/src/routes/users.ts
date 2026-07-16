import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieves a list of all registered users.
 * @returns {Object} JSON response with a data array and status message.
 * @todo Implement full user listing with pagination, filtering, and sorting.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user account.
 * @param {Object} req.body - The user data to create (email, name, etc.).
 * @returns {Object} JSON response with the created user stub and a 201 status code.
 * @todo Implement user creation with validation, password hashing, and database persistence.
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
