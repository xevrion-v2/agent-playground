import { Router, Request, Response } from "express";

const router = Router();

/** Lightweight email format check (intentionally simple — not a full RFC validator). */
function isValidEmail(value: unknown): boolean {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Validate the request body for user creation. Returns an array of error messages. */
function validateCreateUser(body: Record<string, unknown>): string[] {
  const errors: string[] = [];

  if (!body.email || typeof body.email !== "string" || !body.email.trim()) {
    errors.push("email is required and must be a non-empty string.");
  } else if (!isValidEmail(body.email)) {
    errors.push("email must be a valid email address.");
  }

  if (body.name !== undefined && typeof body.name !== "string") {
    errors.push("name, when provided, must be a string.");
  }

  return errors;
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const errors = validateCreateUser(req.body ?? {});

  if (errors.length > 0) {
    res.status(400).json({
      data: null,
      message: "Validation failed.",
      errors
    });
    return;
  }

  const { email, name } = req.body;

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name: name ?? null
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
