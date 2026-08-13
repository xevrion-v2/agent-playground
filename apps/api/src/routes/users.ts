import { Router, Request, Response, NextFunction } from "express";

/**
 * Validates the POST /users request body.
 * Requires `name` and `email` as non-empty strings.
 * Returns a 400 error response with a clear message on validation failure.
 */
function validateCreateUser(req: Request, res: Response, next: NextFunction): void {
  const body = req.body;

  // Ensure body is a plain object
  if (body === undefined || body === null || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({ error: "Request body must be a JSON object." });
    return;
  }

  // Validate name
  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    res.status(400).json({ error: "name is required and must be a non-empty string." });
    return;
  }

  // Validate email
  if (typeof body.email !== "string" || body.email.trim().length === 0) {
    res.status(400).json({ error: "email is required and must be a non-empty string." });
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email.trim())) {
    res.status(400).json({ error: "email must be a valid email address." });
    return;
  }

  next();
}

const router = Router();

/**
 * GET /users
 * Returns a list of users. Currently returns a stub response.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided body. Validates that the request
 * body contains required `name` and `email` fields.
 */
router.post("/", validateCreateUser, (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim()
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
