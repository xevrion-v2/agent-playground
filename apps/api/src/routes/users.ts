import { Router } from "express";

const router = Router();

// In-memory user store for validation demo
interface UserInput {
  name?: string;
  email?: string;
  role?: string;
}

const VALID_ROLES = ["admin", "user", "viewer"];

function validateUser(body: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const input = body as UserInput;

  if (!input.name || typeof input.name !== "string" || input.name.trim().length === 0) {
    errors.push("name is required and must be a non-empty string");
  }

  if (!input.email || typeof input.email !== "string") {
    errors.push("email is required and must be a string");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("email must be a valid email address");
  }

  if (input.role !== undefined && !VALID_ROLES.includes(input.role)) {
    errors.push(`role must be one of: ${VALID_ROLES.join(", ")}`);
  }

  return { valid: errors.length === 0, errors };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const { valid, errors } = validateUser(req.body);

  if (!valid) {
    res.status(400).json({
      status: "error",
      data: null,
      errors,
    });
    return;
  }

  res.status(201).json({
    status: "created",
    data: {
      id: "stub-user-id",
      ...req.body,
    },
  });
});

export default router;
