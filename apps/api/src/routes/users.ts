import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Retrieves a paginated list of all registered users.
 * Intended to support optional query parameters for filtering
 * (e.g. by role, search term) and pagination (page, limit).
 *
 * @returns {Object} JSON with `data` (user array) and optional `total` count.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user with the provided profile payload.
 * Validation and hashing of sensitive fields (e.g. password)
 * should be handled in a corresponding service layer.
 *
 * @body {Object} req.body - User profile fields (email, name, password, etc.)
 * @returns {Object} JSON with `data` containing the created user record.
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
