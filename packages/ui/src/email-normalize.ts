/**
 * Email normalization helper — trims and lowercases email inputs.
 * ponytail: simple string ops, no regex needed for normalization.
 */

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export default normalizeEmail;
