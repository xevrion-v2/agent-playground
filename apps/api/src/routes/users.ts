/**
 * User routes for the agent-playground API.
 * Handles user listing and creation endpoints.
 */

import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 * Returns an empty list of users.
 * User listing functionality is not yet implemented.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user from the request body.
 * Note: ID is currently a stub; should be generated server-side.
 *
 * @param req - Express request containing user data
 * @param res - Express response with created user
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
