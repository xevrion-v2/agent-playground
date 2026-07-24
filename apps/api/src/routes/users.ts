import { Router } from "express";

const router = Router();

/**
 * GET /
 * Retrieves a list of all users.
 *
 * @returns {Object[]} data - Array of user objects (empty in stub implementation).
 * @returns {string} message - Status message describing the response.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /
 * Creates a new user with the provided body data.
 *
 * @param {Object} req.body - User creation payload (e.g., name, email, password).
 * @returns {Object} data - The created user object including a generated stub ID.
 * @returns {string} message - Status message describing the response.
 * @returns {201} HTTP status code for successful resource creation.
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
