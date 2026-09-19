/**
 * Validation for POST /users — rejects malformed/unsafe payloads.
 *
 * Acceptance criteria (Issue #2207):
 *  - Reject non-object JSON bodies
 *  - Require a valid email
 *  - Normalize email/name values
 *  - Ignore client-controlled id and unrelated fields
 */

/** Loose email regex — catches obvious invalid formats. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate and normalize a user creation payload.
 * Only extracts `email` (required) and `name` (optional).
 * All other fields are silently dropped.
 *
 * @param {Record<string, unknown>} body
 * @returns {{ ok: true, data: { email: string, name?: string } } | { ok: false, error: string, message: string }}
 */
export function validateUserCreation(body) {
  const rawEmail = body.email;
  const rawName = body.name;

  // --- Email (required) ---
  if (rawEmail === undefined || rawEmail === null) {
    return { ok: false, error: "EMAIL_REQUIRED", message: "Field 'email' is required." };
  }
  if (typeof rawEmail !== "string") {
    return { ok: false, error: "EMAIL_INVALID_TYPE", message: "Field 'email' must be a string." };
  }
  const email = rawEmail.trim().toLowerCase();
  if (email.length === 0) {
    return { ok: false, error: "EMAIL_EMPTY", message: "Field 'email' must not be empty." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "EMAIL_INVALID_FORMAT", message: "Field 'email' is not a valid email address." };
  }
  if (email.length > 254) {
    return { ok: false, error: "EMAIL_TOO_LONG", message: "Field 'email' exceeds maximum length (254)." };
  }

  // --- Name (optional) ---
  let name;
  if (rawName !== undefined && rawName !== null) {
    if (typeof rawName !== "string") {
      return { ok: false, error: "NAME_INVALID_TYPE", message: "Field 'name' must be a string if provided." };
    }
    name = rawName.trim();
    if (name.length > 100) {
      return { ok: false, error: "NAME_TOO_LONG", message: "Field 'name' exceeds maximum length (100)." };
    }
    if (name.length === 0) {
      name = undefined;
    }
  }

  return { ok: true, data: { email, name } };
}
