import { Router, Request, Response } from "express";

const router = Router();

// Validation: user creation requires name and email fields
interface CreateUserBody {
  name?: string;
  email?: string;
  [key: string]: unknown;
}

function validateCreateUser(body: unknown): { valid: true; data: CreateUserBody } | { valid: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be a JSON object" };
  }
  const data = body as Record<string, unknown>;

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return { valid: false, error: "Field 'name' is required and must be a non-empty string" };
  }

  if (!data.email || typeof data.email !== "string" || data.email.trim().length === 0) {
    return { valid: false, error: "Field 'email' is required and must be a non-empty string" };
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return { valid: false, error: "Field 'email' must be a valid email address" };
  }

  return { valid: true, data: data as CreateUserBody };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const validation = validateCreateUser(req.body);

  if (!validation.valid) {
    res.status(400).json({
      error: validation.error,
      message: "Invalid request body",
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: validation.data.name,
      email: validation.data.email,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
