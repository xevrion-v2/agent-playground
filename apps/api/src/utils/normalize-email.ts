/**
 * Normalizes an email address to lowercase with trimmed whitespace.
 * @module utils/normalize-email
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
