import { Router } from "express";

/**
 * Express router for user-related endpoints.
 * Provides stub implementations for user listing and creation.
 */
const router = Router();

/**
 * GET /users
 * Returns a list of users. Currently returns a stub response.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided body. Currently returns a stub response.
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
