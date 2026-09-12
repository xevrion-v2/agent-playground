import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a paginated listing of registered users.
 *
 * @route GET /users
 * @returns {object} 200 - Empty data array (not yet implemented)
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
 * Registers a new user account.
 *
 * @route POST /users
 * @bodyParam {string} email - The user's email address
 * @bodyParam {string} name  - The user's display name
 * @returns {object} 201 - The newly created user stub with a generated id
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
