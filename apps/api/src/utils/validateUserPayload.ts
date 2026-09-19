/**
 * Validates user creation payload to prevent mass assignment attacks.
 * Only allows known safe fields and rejects dangerous properties like isAdmin.
 * Reference: #9731
 */

const ALLOWED_USER_FIELDS = new Set([
  "id",
  "name",
  "email",
  "username",
  "password",
  "role",
  "avatar",
  "bio",
  "createdAt",
  "updatedAt",
]);

const DANGEROUS_FIELDS = new Set([
  "isAdmin",
  "permissions",
  "roles",
  "__proto__",
  "constructor",
  "prototype",
]);

export type ValidatedUserData = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  avatar?: string;
  bio?: string;
};

export function validateUserPayload(
  body: Record<string, unknown>
): { valid: true; data: ValidatedUserData } | { valid: false; errors: string[] } {
  const errors: string[] = [];
  const sanitized: ValidatedUserData = {};

  for (const key of Object.keys(body)) {
    if (DANGEROUS_FIELDS.has(key)) {
      errors.push(`Rejected dangerous field: ${key}`);
    }
  }

  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_USER_FIELDS.has(key) && !DANGEROUS_FIELDS.has(key)) {
      if (typeof value === "string") {
        sanitized[key as keyof ValidatedUserData] = value;
      } else if (value !== undefined) {
        errors.push(`Field ${key} must be a string`);
      }
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: sanitized };
}

export function isMassAssignmentAttempt(body: Record<string, unknown>): boolean {
  return Object.keys(body).some((key) => DANGEROUS_FIELDS.has(key));
}