import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a stub list of users.
 * Intended to be replaced with a database-backed user service once the
 * persistence layer is wired in.
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
 * Creates a stub user record from the request body.
 * The returned `id` is a placeholder; real user creation should
 * delegate to a service layer that persists to the database.
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
