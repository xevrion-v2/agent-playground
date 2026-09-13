import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 * 
 * Retrieves a list of all users.
 * Currently returns a stub response — this endpoint is not yet fully implemented.
 * 
 * @route GET /users
 * @returns {Object} 200 - An object containing an empty data array and a stub message.
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
 * Creates a new user with the provided data.
 * Currently returns a stub response — the user is not actually persisted.
 * 
 * @route POST /users
 * @param {Object} req.body - The user attributes to create.
 * @returns {Object} 201 - An object containing the stub user data (with echoed body fields) and a stub message.
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
