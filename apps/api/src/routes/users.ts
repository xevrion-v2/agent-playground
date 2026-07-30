import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a paginated list of users. Currently returns an empty
 * array as the service is not yet implemented.
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
 * Creates a new user with the provided request body data.
 * Currently returns a stub user object with a generated id.
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
