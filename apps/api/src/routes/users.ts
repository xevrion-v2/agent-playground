import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Retrieve a list of all users.
 * Currently returns a stub response — implementation pending.
 *
 * @route GET /users
 * @returns {Object} JSON response with an empty data array and status message.
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
 * Create a new user.
 * Currently returns a stub response with a placeholder ID — implementation pending.
 *
 * @route POST /users
 * @param {Request} req - Express request object containing user data in body.
 * @returns {Object} JSON response with the created stub user data.
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
