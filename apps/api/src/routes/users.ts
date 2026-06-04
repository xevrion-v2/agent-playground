import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a list of all users.
 *
 * @route GET /
 * @returns {Object} JSON response with an empty data array and a placeholder message.
 *
 * @example
 * // Response
 * {
 *   "data": [],
 *   "message": "User listing is not implemented yet."
 * }
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
 * Returns a stub user object with a generated ID merged with the request body.
 *
 * @route POST /
 * @param {Request} req - Express request object. The body should contain user fields (e.g. name, email).
 * @param {Response} res - Express response object.
 * @returns {Object} JSON response with status 201 containing the created user stub and a placeholder message.
 *
 * @example
 * // Request body
 * { "name": "Alice", "email": "alice@example.com" }
 *
 * // Response (201 Created)
 * {
 *   "data": {
 *     "id": "stub-user-id",
 *     "name": "Alice",
 *     "email": "alice@example.com"
 *   },
 *   "message": "User creation is not implemented yet."
 * }
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
