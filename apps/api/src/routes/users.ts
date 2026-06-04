import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * TODO: Implement pagination (query params: page, limit)
 * TODO: Add filtering by name/email (query params: search)
 * TODO: Integrate with userService.listUsers() and Prisma
 * TODO: Add rate limiting for public endpoints
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
 * TODO: Add request body validation (email format, name length)
 * TODO: Check for duplicate email before creating
 * TODO: Hash password if auth is implemented
 * TODO: Integrate with userService.createUser() and Prisma
 * TODO: Return 201 with created user object
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

/**
 * GET /users/:id
 *
 * TODO: Implement this route
 * TODO: Return 404 if user not found
 * TODO: Include user's jobs and proposals in response
 */
// router.get("/:id", ...)

/**
 * PATCH /users/:id
 *
 * TODO: Implement this route
 * TODO: Validate request body against updatable fields
 * TODO: Return 404 if user not found
 */
// router.patch("/:id", ...)

/**
 * DELETE /users/:id
 *
 * TODO: Implement this route
 * TODO: Add authorization check (only the user themselves or admin)
 * TODO: Cascade delete related records or handle gracefully
 */
// router.delete("/:id", ...)

export default router;
