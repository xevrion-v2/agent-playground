import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieves a list of users.
 * 
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @returns JSON response with empty user array and status message
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided data.
 * 
 * @param req - Express request object containing user data in body
 * @param res - Express response object
 * @returns JSON response with created user data and confirmation message
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
