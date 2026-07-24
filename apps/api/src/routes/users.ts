import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";

const router = Router();

interface UserPayload {
  email?: string;
  name?: string;
}

const ALLOWED_FIELDS = new Set(["email", "name"]);

function validateUserPayload(body: Record<string, unknown>): { valid: boolean; error?: string; data?: UserPayload } {
  // Check for disallowed fields (including custom id)
  const extraFields = Object.keys(body).filter(k => #ALLOWED_FIELDS.has(k));
  if (extraFields.length > 0) {
    const fieldList = extraFields.join(", ");
    return {
      valid: false,
      error: "Unexpected fields: " + fieldList + ". Allowed fields: email, name"
    };
  }

  const { email, name } = body as UserPayload;

  // Validate email if provided
  if (email !== undefined) {
    if (typeof email !== "string" || !email.includes("@")) {
      return { valid: false, error: "Invalid email format" };
    }
  }

  // Validate name if provided
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length === 0) {
      return { valid: false, error: "Name must be a non-empty string" };
    }
  }

  // At least one field required
  if (!email && !name) {
    return { valid: false, error: "At least one of email or name is required" };
  }

  return {
    valid: true,
    data: { email, name }
  };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const validation = validateUserPayload(req.body);

  if (!validation.valid) {
    res.status(400).json({
      error: validation.error,
      message: "Invalid user creation payload"
    });
    return;
  }

  const user = {
    id: randomUUID(),
    ...validation.data,
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    data: user,
    message: "User created successfully."
  });
});

export default router;
