import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of all users.
 * @todo Implement actual database query to replace stub response.
 * @param _req - Express request (unused)
 * @param res - Express response
 * @returns JSON with empty data array and status message
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided request body.
 * @todo Implement actual user creation with validation and database persistence.
 * @param req - Express request containing user fields in body
 * @param res - Express response
 * @returns 201 with stub user object (includes generated id + request body)
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
