import { Router, Request, Response } from "express";

const router = Router();

// Validation rules
const MAX_BODY_SIZE = 1024; // bytes
const ALLOWED_FIELDS = ["name", "email"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;

function validateBody(body: unknown): { valid: boolean; error?: string; sanitized?: Record<string, string> } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const raw = body as Record<string, unknown>;
  const sanitized: Record<string, string> = {};
  const unknownFields = Object.keys(raw).filter((k) => !ALLOWED_FIELDS.includes(k));

  if (unknownFields.length > 0) {
    return { valid: false, error: `Unknown fields: ${unknownFields.join(", ")}. Allowed: ${ALLOWED_FIELDS.join(", ")}` };
  }

  // Validate name
  if (raw.name !== undefined) {
    if (typeof raw.name !== "string" || raw.name.trim().length === 0) {
      return { valid: false, error: "name must be a non-empty string" };
    }
    sanitized.name = raw.name.trim().substring(0, MAX_NAME_LENGTH);
  }

  // Validate email
  if (raw.email !== undefined) {
    if (typeof raw.email !== "string" || !EMAIL_REGEX.test(raw.email)) {
      return { valid: false, error: "Invalid email format" };
    }
    sanitized.email = raw.email.trim().toLowerCase();
  }

  return { valid: true, sanitized };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  // Check body size
  const bodySize = JSON.stringify(req.body).length;
  if (bodySize > MAX_BODY_SIZE) {
    res.status(413).json({
      error: `Request body too large. Maximum ${MAX_BODY_SIZE} bytes allowed.`,
    });
    return;
  }

  const validation = validateBody(req.body);

  if (!validation.valid) {
    res.status(400).json({ error: validation.error });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...validation.sanitized,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
