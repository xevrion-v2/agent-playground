/**
 * User creation payload validation utilities.
 *
 * Ensures that POST /users receives well-formed input and returns
 * normalized, server-controlled user objects.
 */

/**
 * Result of a user payload validation attempt.
 */
export type UserValidationResult =
  | { success: true; data: ValidatedUserPayload }
  | { success: false; error: string; statusCode: number };

/**
 * A validated and normalized user creation payload.
 * Only allowed fields are present; client-controlled id is stripped.
 */
export type ValidatedUserPayload = {
  email: string;
  name?: string;
};

/**
 * Simple email format validation.
 * Checks for basic structure: local@domain.tld
 * Not RFC 5322 complete, but sufficient for API input guarding.
 *
 * @param value - The value to check.
 * @returns True if the value looks like a valid email address.
 */
export function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Check whether a value is a plain object (not array, not null).
 *
 * @param value - The value to check.
 * @returns True if the value is a plain object.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Normalize an email address: trim whitespace and lowercase.
 *
 * @param email - The raw email string.
 * @returns The normalized email.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Normalize a name: trim whitespace and collapse internal spaces.
 *
 * @param name - The raw name string.
 * @returns The normalized name, or undefined if empty after trimming.
 */
export function normalizeName(name: string): string | undefined {
  const trimmed = name.trim().replace(/\s+/g, " ");
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Validate and normalize a user creation payload.
 *
 * Rules enforced:
 * - Body must be a plain JSON object (arrays, strings, numbers rejected)
 * - Email is required and must match a basic email pattern
 * - Email is normalized (trimmed, lowercased)
 * - Name is optional; if present it must be a string and is normalized
 * - Client-supplied `id` and any other unknown fields are ignored
 *
 * @param body - The raw request body from Express.
 * @returns A validation result with either normalized data or an error.
 */
export function validateUserPayload(body: unknown): UserValidationResult {
  // Reject non-object bodies (arrays, strings, numbers, null)
  if (!isPlainObject(body)) {
    return {
      success: false,
      error: "Request body must be a JSON object.",
      statusCode: 400
    };
  }

  // Email is required
  if (!("email" in body)) {
    return {
      success: false,
      error: "email is required.",
      statusCode: 400
    };
  }

  // Email must be valid
  if (!isValidEmail(body.email)) {
    return {
      success: false,
      error: "email must be a valid email address.",
      statusCode: 400
    };
  }

  const email = normalizeEmail(body.email as string);

  // Name is optional, but if present must be a string
  let name: string | undefined;
  if ("name" in body) {
    if (typeof body.name !== "string") {
      return {
        success: false,
        error: "name must be a string when provided.",
        statusCode: 400
      };
    }
    name = normalizeName(body.name);
  }

  // Build normalized payload — only allowed fields, no client id
  const data: ValidatedUserPayload = { email };
  if (name !== undefined) {
    data.name = name;
  }

  return { success: true, data };
}
