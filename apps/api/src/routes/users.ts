import { Router, Request, Response, NextFunction } from "express";

/**
 * Validates that the request body contains a valid user payload.
 * Returns 400 for invalid input.
 */
function validateUserBody(req: Request, res: Response, next: NextFunction): void {
  const { email, name } = req.body;

  if (req.body === undefined || req.body === null || typeof req.body !== "object") {
    res.status(400).json({ error: "Request body must be a JSON object." });
    return;
  }

  if (email !== undefined && typeof email !== "string") {
    res.status(400).json({ error: "email must be a string." });
    return;
  }

  if (name !== undefined && typeof name !== "string") {
    res.status(400).json({ error: "name must be a string." });
    return;
  }

  next();
}

/**
 * Express router for user-related endpoints.
 * Provides stub implementations for user listing and creation.
 */
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
 * Creates a new user with the provided body. Currently returns a stub response.
 * Validates that the request body is a valid JSON object.
 */
router.post("/", validateUserBody, (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
