import { Router, Request, Response } from "express";

const router = Router();

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Allowed fields for user creation
const ALLOWED_FIELDS = ["email", "name"];

// Validation error type
interface ValidationError {
  field: string;
  message: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// Normalize email (lowercase, trim)
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

// Normalize name (trim, capitalize first letter of each word)
function normalizeName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Validate user creation payload
function validateUserPayload(body: unknown): {
  valid: boolean;
  errors: ValidationError[];
  data?: { email: string; name?: string };
} {
  const errors: ValidationError[] = [];

  // 1. Reject non-object JSON bodies
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      valid: false,
      errors: [{ field: "body", message: "Request body must be a JSON object" }],
    };
  }

  const obj = body as Record<string, unknown>;

  // 2. Check for disallowed fields (ignore client-controlled id and unrelated fields)
  const disallowedFields = Object.keys(obj).filter(
    (key) => !ALLOWED_FIELDS.includes(key)
  );
  if (disallowedFields.length > 0) {
    // Silently ignore disallowed fields (don't error, just strip them)
    for (const field of disallowedFields) {
      delete obj[field];
    }
  }

  // 3. Require a valid email
  if (!obj.email || typeof obj.email !== "string") {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(obj.email)) {
    errors.push({ field: "email", message: "Email must be a valid email address" });
  }

  // 4. Validate name if provided
  if (obj.name !== undefined) {
    if (typeof obj.name !== "string") {
      errors.push({ field: "name", message: "Name must be a string" });
    } else if (obj.name.trim().length === 0) {
      errors.push({ field: "name", message: "Name cannot be empty" });
    }
  }

  // If there are errors, return them
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // 5. Normalize values
  return {
    valid: true,
    errors: [],
    data: {
      email: normalizeEmail(obj.email as string),
      name: obj.name ? normalizeName(obj.name as string) : undefined,
    },
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  // Validate the payload
  const validation = validateUserPayload(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Validation failed",
      details: validation.errors,
    });
  }

  // In a real implementation, you would save to a database here
  // For now, return the validated and normalized data
  res.status(201).json({
    data: {
      id: "generated-server-id", // Server-generated ID, not from client
      ...validation.data,
      createdAt: new Date().toISOString(),
    },
    message: "User created successfully",
  });
});

// Export validation function for testing
export { validateUserPayload, normalizeEmail, normalizeName, isValidEmail };

export default router;
