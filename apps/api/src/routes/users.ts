import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Retrieves a list of all users.
 * Currently returns a stub response — implementation pending.
 *
 * @route GET /users
 * @returns {object} JSON with empty data array and status message
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
 * Creates a new user.
 * Currently returns a stub response — implementation pending.
 *
 * @route POST /users
 * @param {object} req.body - User data payload
 * @returns {object} JSON with stub user data and status message
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
