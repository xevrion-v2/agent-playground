import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * TODO: Add pagination support (query params: page, limit)
 * TODO: Add filtering by name, email, role
 * TODO: Add search by keyword
 * TODO: Handle invalid query params with 400 response
 * TODO: Return total count in response for client-side pagination
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    page: 1,
    limit: 20,
    total: 0,
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * TODO: Validate request body (name required, email format)
 * TODO: Check for duplicate email before creating user
 * TODO: Insert user into database via userService
 * TODO: Handle database errors with 500 response
 * TODO: Return created user with 201 status and Location header
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
