import { Router, Request, Response } from "express";

/**
 * User routes router handling user-related API endpoints.
 * @description Provides endpoints for listing and creating users.
 */
const router = Router();

/**
 * GET /users
 * Retrieves a list of users (currently returns empty array).
 * @param _req - Express request object (unused parameters prefixed with underscore)
 * @param res - Express response object
 * @returns JSON response with empty data array and status message
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user (currently returns stub data).
 * @param req - Express request object containing user data in body
 * @param res - Express response object
 * @returns JSON response with created user stub data and status message
 */
router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
