import { Router } from "express";

const router = Router();

/** Email validation regex pattern */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate user creation input */
function validateUserInput(body: unknown): { valid: false; errors: string[] } | { valid: true; data: { name: string; email: string } } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, errors: ["Request body must be an object"] };
  }

  const { name, email } = body as Record<string, unknown>;
  const errors: string[] = [];

  if (typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name is required and must be a non-empty string");
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    errors.push("Email is required and must be a valid email address");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name: (name as string).trim(),
      email: (email as string).toLowerCase().trim()
    }
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const validation = validateUserInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      status: "error",
      errors: validation.errors
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: validation.data.name,
      email: validation.data.email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
