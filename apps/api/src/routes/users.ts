/**
 * User route handlers for the TaskFlow API.
 *
 * Provides stub endpoints for user listing and creation.
 * These routes are intended to be backed by a user service layer
 * once the Prisma integration is complete.
 *
 * @module routes/users
 */
import { Router, Request, Response } from "express";
import { sendError } from "../middleware/errorHandler";

const router = Router();

/**
 * Expected shape for a create-user request body.
 */
interface CreateUserBody {
  email: string;
  name?: string;
}

/**
 * Validate the create-user payload and return an error message
 * when the input is invalid.
 */
function validateCreateUser(body: unknown): body is CreateUserBody {
  if (typeof body !== "object" || body === null) {
    return false;
  }
  const b = body as Record<string, unknown>;
  if (typeof b.email !== "string" || b.email.trim().length === 0) {
    return false;
  }
  if (b.name !== undefined && typeof b.name !== "string") {
    return false;
  }
  return true;
}

/**
 * GET /users
 *
 * Lists all registered users.
 *
 * @todo Replace stub with Prisma user.findMany() query.
 * @todo Add pagination via page and limit query parameters.
 * @todo Add filtering by role, skill, or status.
 * @todo Return proper error response when the database is unavailable.
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
 * Creates a new user account.
 *
 * @todo Replace stub with Prisma user.create() after validating input.
 * @todo Hash passwords before storage.
 * @todo Check for duplicate email addresses.
 * @todo Return proper error response when the database is unavailable.
 */
router.post("/", (req: Request, res: Response) => {
  if (!validateCreateUser(req.body)) {
    return sendError(res, 400, "VALIDATION_ERROR",
      "Request body must be a JSON object with a non-empty email string.");
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
