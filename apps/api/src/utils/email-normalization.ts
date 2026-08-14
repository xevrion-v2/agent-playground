/**
 * Normalizes email addresses for consistent comparison.
 * Lowercases and removes leading/trailing whitespace.
 *
 * @example
 * `	s
 * import { normalizeEmail } from './email-normalization';
 * normalizeEmail('  User@Example.COM '); // => 'user@example.com'
 * `
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
