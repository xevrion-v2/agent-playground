import { Router, Request, Response } from "express";

const router = Router();

export interface CreateUserBody {
  email: string;
  name?: string;
}

export function validateCreateUser(body: unknown): { valid: boolean; errors: string[]; data?: CreateUserBody } {
  const errors: string[] = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, errors: ["Request body must be a JSON object"] };
  }

  const b = body as Record<string, unknown>;

  const email = b.email?.trim();
  if (!email || typeof email !== "string") {
    errors.push("Email is required and must be a string");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format");
  }

  if (b.name !== undefined && typeof b.name !== "string") {
    errors.push("Name must be a string if provided");
  }

  if (b.id !== undefined) {
    // Ignore client-controlled id - will be generated server-side
  }

  // Filter out unknown fields
  const allowedFields = ["email", "name"];
  const unknownFields = Object.keys(b).filter((k) => !allowedFields.includes(k));
  if (unknownFields.length > 0) {
    // We don't error on unknown fields, we just ignore them
    // But we could warn - for now we silently ignore
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      email: email.toLowerCase(),
      name: b.name?.trim(),
    },
  };
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
    return res.status(400).json({
      error: "Validation failed",
      details: validation.errors,
    });
  }

  // TODO: Implement actual user creation with database
  // For now, return a stub response with server-generated ID
  res.status(201).json({
    data: {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      email: validation.data!.email,
      name: validation.data!.name,
      createdAt: new Date().toISOString(),
    },
    message: "User created successfully",
  });
});

export default router;