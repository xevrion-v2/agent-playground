import { Router } from "express";
import { sendApiError } from "../lib/errors.js";

const router = Router();

/**
 * Lightweight validation for user creation payload.
 * Returns null if valid, or an error descriptor if invalid.
 */
function validateUserPayload(body: unknown): { code: string; message: string } | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { code: "INVALID_PAYLOAD", message: "Request body must be a JSON object" };
  }

  const obj = body as Record<string, unknown>;

  if (typeof obj.name !== "string" || obj.name.trim().length === 0) {
    return { code: "INVALID_NAME", message: "Field 'name' is required and must be a non-empty string" };
  }

  if (typeof obj.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.email)) {
    return { code: "INVALID_EMAIL", message: "Field 'email' is required and must be a valid email address" };
  }

  return null;
}

// TODO: Replace stub with real user listing from database
// - Add pagination support (limit, offset or cursor-based)
// - Implement filtering by role, status, and creation date
// - Add field selection via query params (?fields=id,name,email)
// - Return proper error responses for DB connection failures
// - Add rate limiting to prevent abuse
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Replace stub with real user creation logic
// - Validate request body against schema (name, email required; email format)
// - Check for duplicate email before insertion
// - Generate secure unique ID (UUID v4 or nanoid) instead of hardcoded stub
// - Hash password if authentication fields are added later
// - Return 400 for invalid input, 409 for duplicate email, 500 for DB errors
// - Emit audit log entry on successful creation
// - Consider returning Location header pointing to new resource
router.post("/", (req, res) => {
  const validationError = validateUserPayload(req.body);
  if (validationError) {
    sendApiError(res, 400, validationError.code, validationError.message);
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
