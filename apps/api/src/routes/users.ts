import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a paginated list of users.
 * Currently returns a stub response; pagination, filtering,
 * and search will be added in a follow-up.
 *
 * @param _req - Express request object
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
 *
 * Creates a new user record.
 * Currently returns a stub response; input validation, duplicate
 * email checking, and database persistence will be added in a follow-up.
 *
 * @param req - Express request object (expects JSON body with user data)
 * @param res - Express response object
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
