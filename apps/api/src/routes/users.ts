import { Router, Request, Response } from "express";

const router = Router();

/**
 * List all users.
 * Returns a stub response indicating the user listing endpoint is not yet implemented.
 *
 * @route GET /users
 * @returns {{ data: Array, message: string }} Stub response with empty data array and status message.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user.
 * Returns a stub response echoing back the request body with a generated stub ID.
 *
 * @route POST /users
 * @param {{ id?: string }} req.body - The user data to create (currently ignored; stub ID is returned).
 * @returns {{ data: { id: string, [key: string]: unknown }, message: string }} Stub response with created user object and status message.
 * @status 201
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
