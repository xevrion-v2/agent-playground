import { Router, Request, Response } from "express";

const router = Router();

/**
 * Represents a user entity in the system.
 * @interface User
 * @property {string} id - Unique identifier for the user (auto-generated on creation).
 * @property {string} [name] - Optional display name of the user.
 * @property {string} [email] - Optional email address of the user.
 */
interface User {
  id: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

/**
 * Standard response wrapper for user-related API operations.
 * @interface UserResponse
 * @template T
 * @property {T} data - The payload containing user data or a list of users.
 * @property {string} message - A human-readable description of the operation result.
 */
interface UserResponse<T> {
  data: T;
  message: string;
}

/**
 * Retrieves a paginated list of users.
 *
 * Currently returns an empty stub response. Future implementations should
 * support query parameters for pagination, filtering, and sorting.
 *
 * @route GET /
 * @param {Request} _req - Express request object (unused in current stub).
 * @param {Response} res - Express response object.
 * @returns {void} Responds with a JSON array of users and a status message.
 */
router.get("/", (_req: Request, res: Response): void => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Creates a new user with the provided payload.
 *
 * Accepts user fields in the request body (e.g., `name`, `email`) and
 * returns the created user with a generated stub ID.
 *
 * @route POST /
 * @param {Request} req - Express request object containing user data in `req.body`.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with HTTP 201 and the created user object.
 */
router.post("/", (req: Request, res: Response): void => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    } as User,
    message: "User creation is not implemented yet."
  } satisfies UserResponse<User>);
});

export default router;
