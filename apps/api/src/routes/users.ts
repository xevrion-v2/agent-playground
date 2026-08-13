import { Router, Request, Response } from "express";

const router = Router();

// Validation helper: returns an error message string or null if valid
function validateCreateUser(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return "Request body must be a JSON object";
  }

  const { email, name } = body as Record<string, unknown>;

  if (email === undefined) {
    return "Missing required field: email";
  }

  if (typeof email !== "string" || email.trim() === "") {
    return "Field 'email' must be a non-empty string";
  }

  // Simple RFC 5322 email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Field 'email' must be a valid email address";
  }

  if (name !== undefined && typeof name !== "string") {
    return "Field 'name' must be a string when provided";
  }

  return null;
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const validationError = validateCreateUser(req.body);

  if (validationError) {
    res.status(400).json({
      error: "Validation failed",
      message: validationError
    });
    return;
  }

  const { email, name } = req.body as { email: string; name?: string };

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email: email.trim(),
      ...(name !== undefined ? { name: name.trim() } : {})
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
