/**
 * User creation payload validation.
 *
 * Validates and sanitizes POST /users request bodies according to:
 * - Rejects non-object JSON (arrays, primitives, null)
 * - Requires valid email
 * - Normalizes email (trim, lowercase) and name (trim, capitalize)
 * - Strips client-supplied `id` and any fields beyond { name, email }
 */
export interface CreateUserRequest {
  name?: string;
  email?: string;
  [key: string]: unknown;
}

export interface CreateUserPayload {
  name: string;
  email: string;
}

export interface ValidationResult {
  valid: boolean;
  /** Sanitized payload when valid */
  payload?: CreateUserPayload;
  /** Human-readable error message */
  error?: string;
  /** HTTP status code for the error response */
  status?: number;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a raw request body for user creation.
 *
 * @param body - The parsed JSON body (any type)
 * @returns A ValidationResult with the sanitized payload or an error
 */
export function validateCreateUserPayload(body: unknown): ValidationResult {
  // 1. Reject non-object bodies (arrays, strings, numbers, booleans, null, undefined)
  if (body === null || body === undefined) {
    return { valid: false, error: "Request body is required", status: 400 };
  }

  if (typeof body !== "object") {
    return {
      valid: false,
      error: `Expected a JSON object, got ${typeof body}`,
      status: 400,
    };
  }

  if (Array.isArray(body)) {
    return { valid: false, error: "Expected a JSON object, got array", status: 400 };
  }

  const raw = body as Record<string, unknown>;

  // 2. Require email
  if (!raw.email || typeof raw.email !== "string" || raw.email.trim().length === 0) {
    return { valid: false, error: "A valid email is required", status: 400 };
  }

  const normalizedEmail = raw.email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return { valid: false, error: `Invalid email format: ${raw.email}`, status: 400 };
  }

  // 3. Normalize name
  let normalizedName = "";
  if (raw.name && typeof raw.name === "string") {
    normalizedName = raw.name.trim();
    // Capitalize each word
    normalizedName = normalizedName.replace(
      /\b\w/g,
      (c) => c.toUpperCase()
    );
  }

  // 4. Ignore client-controlled id, return only { name, email }
  return {
    valid: true,
    payload: { name: normalizedName, email: normalizedEmail },
  };
}
