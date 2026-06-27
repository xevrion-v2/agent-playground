import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of all users.
 * Currently returns an empty array (not yet implemented).
 *
 * @returns {Object} response with empty data array
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided body data.
 * Currently returns a stub response with the request body spread into a fixed ID.
 *
 * @param {Object} req.body - User data to create
 * @returns {Object} response with created user stub (201)
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
