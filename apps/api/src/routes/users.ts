import { Router, Request, Response } from "express";
import { ApiError, sendErrorResponse } from "../utils/api-error";

const router = Router();

/**
 * GET /users
 *
 * Retrieves a list of all registered users.
 * Currently returns a stub response indicating the feature is not yet implemented.
 *
 * @route GET /users
 * @returns {object} 200 - An object containing an empty user array and a descriptive message.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * GET /users/:id
 *
 * Looks up a user by ID. Demonstrates ApiError.notFound for a nonexistent user.
 *
 * @route GET /users/:id
 * @returns {object} 200 - A stub user object.
 * @returns {object} 404 - Error response when user is not found.
 */
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === "nonexistent") {
    return sendErrorResponse(res, ApiError.notFound(`User with id '${id}' not found`));
  }
  res.json({
    data: { id },
    message: `User lookup for '${id}' is not fully implemented yet.`
  });
});

/**
 * POST /users
 *
 * Creates a new user with the data provided in the request body.
 * Demonstrates ApiError.badRequest for empty bodies.
 *
 * @route POST /users
 * @param {object} req.body - The user payload to create.
 * @returns {object} 201 - An object containing a stub user record (with a generated id) and a descriptive message.
 * @returns {object} 400 - Error response when body is missing or empty.
 */
router.post("/", (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
    return sendErrorResponse(res, ApiError.badRequest("Request body must be a non-empty JSON object"));
  }
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
