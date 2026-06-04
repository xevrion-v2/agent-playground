import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

/** Simple email regex for basic validation. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Max length for user names. */
const NAME_MAX_LENGTH = 100;

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate a user creation payload.
 *
 * @param body - The parsed request body.
 * @returns An array of validation errors (empty if valid).
 */
function validateCreateUser(body: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!body.email || typeof body.email !== "string") {
    errors.push({ field: "email", message: "Email is required and must be a string." });
  } else if (!EMAIL_RE.test(body.email)) {
    errors.push({ field: "email", message: "Email format is invalid." });
  }

  if (body.name !== undefined && body.name !== null) {
    if (typeof body.name !== "string") {
      errors.push({ field: "name", message: "Name must be a string." });
    } else if (body.name.length > NAME_MAX_LENGTH) {
      errors.push({ field: "name", message: `Name must be at most ${NAME_MAX_LENGTH} characters.` });
    }
  }

  return errors;
}

router.post("/", (req: Request, res: Response) => {
  const errors = validateCreateUser(req.body || {});

  if (errors.length > 0) {
    res.status(400).json({
      error: true,
      status: 400,
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
