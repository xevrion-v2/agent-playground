import { Router, Request, Response } from "express";
import { sendError } from "../errorHandler";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate request body for POST /users.
 * Returns an error string or null if valid.
 */
function validateUserBody(body: unknown): string | null {
  if (body === null || body === undefined || typeof body !== "object" || Array.isArray(body)) {
    return "Request body must be a JSON object.";
  }
  const { name, email } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return "name is required and must be a non-empty string.";
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return "email is required and must be a valid email address.";
  }

  return null;
}

/**
 * GET /users
 * Returns a paginated list of all users.
 * Currently a stub — returns an empty array.
 *
 * @route GET /users
 * @returns {Object} 200 - Empty user list
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", data: [] });
});

/**
 * POST /users
 * Creates a new user with the provided request body.
 * Validates name (required, non-empty string) and email (required, valid format).
 * Currently a stub — returns a placeholder user ID.
 *
 * @route POST /users
 * @body {string} name - Required display name
 * @body {string} email - Required user email address
 * @returns {Object} 201 - Newly created user stub
 * @returns {Object} 400 - Validation error
 */
router.post("/", (req: Request, res: Response) => {
  const error = validateUserBody(req.body);
  if (error) {
    return sendError(res, 400, error);
  }

  const { name, email } = req.body as { name: string; email: string };

  res.status(201).json({
    status: "ok",
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim(),
    },
  });
});

export default router;
