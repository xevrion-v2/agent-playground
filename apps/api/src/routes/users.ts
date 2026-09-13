import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Retrieves a list of all registered users.
 * Currently returns a stub response — full implementation pending.
 *
 * @param _req - Express request object (unused in stub)
 * @param res  - Express response object used to return JSON
 *
 * @returns {Promise<void>} JSON response with an empty data array
 *
 * @todo Implement database query to fetch actual users
 */
router.get("/", (_req: Request, res: Response): void => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user account.
 * Currently returns a stub response with a generated ID — full implementation pending.
 *
 * @param req - Express request object containing user data in `req.body`
 * @param res - Express response object used to return the created user
 *
 * @returns {Promise<void>} JSON response with the stub user and HTTP 201 status
 *
 * @todo Implement user creation with database persistence
 * @todo Add input validation (email format, password strength)
 * @todo Handle duplicate email errors
 */
router.post("/", (req: Request, res: Response): void => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
