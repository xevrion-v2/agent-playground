import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

interface ValidationError {
  path: string;
  message: string;
}

interface ValidationOk {
  ok: true;
  name: string;
  email: string;
}
interface ValidationFail {
  ok: false;
  errors: ValidationError[];
}

type ValidationResult = ValidationOk | ValidationFail;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a user creation payload.
 *
 * - Rejects non-object bodies entirely.
 * - Requires a valid email and a non-empty name.
 * - Returns trimmed / normalized values on success.
 */
function validateCreateUser(body: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    errors.push({ path: "body", message: "Request body must be a JSON object." });
    return { ok: false, errors };
  }

  const data = body as Record<string, unknown>;

  // --- name validation ---
  const rawName = data.name;
  const name = typeof rawName === "string" ? rawName.trim() : rawName;

  if (!name || (typeof name === "string" && name.length === 0)) {
    errors.push({ path: "name", message: "Name is required and must be a non-empty string." });
  }

  // --- email validation ---
  const rawEmail = data.email;
  const email = typeof rawEmail === "string" ? rawEmail.trim() : rawEmail;

  if (!email || (typeof email === "string" && email.length === 0)) {
    errors.push({ path: "email", message: "Email is required and must be a non-empty string." });
  } else if (typeof email === "string" && !EMAIL_REGEX.test(email)) {
    errors.push({ path: "email", message: "Email must be a valid email address." });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, name: name as string, email: email as string };
}

router.post("/", (req: Request, res: Response) => {
  const result = validateCreateUser(req.body);

  if (!result.ok) {
    res.status(400).json({ errors: (result as ValidationFail).errors });
    return;
  }

  // Only return server-generated id and validated/trimmed fields
  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: (result as ValidationOk).name,
      email: (result as ValidationOk).email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
