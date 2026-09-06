import { Router, Request, Response } from "express";

const router = Router();

/**
 * Lightweight request body validator for user creation.
 * Returns an array of error messages, or an empty array if valid.
 */
function validateCreateUser(body: Record<string, unknown>): string[] {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return ["Request body must be a JSON object."];
  }

  // Email is required
  if (!body.email || typeof body.email !== "string") {
    errors.push("email is required and must be a string.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("email must be a valid email address.");
  }

  // Name is optional but must be a non-empty string if provided
  if (body.name !== undefined && body.name !== null) {
    if (typeof body.name !== "string" || body.name.trim().length === 0) {
      errors.push("name must be a non-empty string if provided.");
    }
  }

  return errors;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const errors = validateCreateUser(req.body);
  if (errors.length > 0) {
    res.status(400).json({
      status: "error",
      message: "Validation failed.",
      errors
    });
    return;
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
