import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 * TODO: implement listing users with pagination, filtering (by role, status, etc.), and sorting.
 * Expected behavior: return a paginated list of users.
 * Error cases:
 *   - 400 Bad Request: invalid query parameters (e.g., invalid page number, unsupported filter).
 *   - 500 Internal Server Error: unexpected server failure.
 */
router.get("/", (req: Request, res: Response) => {
  // TODO: implement
  res.status(501).json({ message: "Not Implemented" });
});

/**
 * GET /users/:id
 * TODO: implement retrieving a single user by ID.
 * Expected behavior: return the user object.
 * Error cases:
 *   - 400 Bad Request: invalid user ID format.
 *   - 404 Not Found: user with given ID does not exist.
 *   - 500 Internal Server Error: unexpected server failure.
 */
router.get("/:id", (req: Request, res: Response) => {
  // TODO: implement
  res.status(501).json({ message: "Not Implemented" });
});

/**
 * POST /users
 * TODO: implement creating a new user.
 * Expected behavior: validate request body, create user record, return created user with 201 status.
 * Error cases:
 *   - 400 Bad Request: validation errors (missing/invalid fields, duplicate email).
 *   - 500 Internal Server Error: unexpected server failure.
 */
router.post("/", (req: Request, res: Response) => {
  // TODO: implement
  res.status(501).json({ message: "Not Implemented" });
});

/**
 * PUT /users/:id
 * TODO: implement updating an existing user.
 * Expected behavior: validate request body, update user record, return updated user.
 * Error cases:
 *   - 400 Bad Request: invalid user ID, validation errors.
 *   - 404 Not Found: user not found.
 *   - 500 Internal Server Error: unexpected server failure.
 */
router.put("/:id", (req: Request, res: Response) => {
  // TODO: implement
  res.status(501).json({ message: "Not Implemented" });
});

/**
 * DELETE /users/:id
 * TODO: implement deleting a user by ID.
 * Expected behavior: delete user record, return 204 No Content.
 * Error cases:
 *   - 400 Bad Request: invalid user ID.
 *   - 404 Not Found: user not found.
 *   - 500 Internal Server Error: unexpected server failure.
 */
router.delete("/:id", (req: Request, res: Response) => {
  // TODO: implement
  res.status(501).json({ message: "Not Implemented" });
});

export default router;
