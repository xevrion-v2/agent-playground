import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Lists all registered users in the TaskFlow system.
 * Currently returns an empty stub response while the
 * database integration is being implemented.
 *
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @returns JSON response with an empty data array and status message
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user in the TaskFlow system.
 * Currently returns a stub response with a placeholder user ID
 * and echoes back the provided request body fields.
 *
 * @param req - Express request object containing user data in the body
 * @param res - Express response object
 * @returns JSON response with the created user stub and status message
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
