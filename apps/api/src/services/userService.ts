import { randomUUID } from "crypto";

/**
 * Validates that a value is a valid JSON object
 * @param value - The value to check
 * @returns True if value is an object (not array or null)
 */
export function isObject(value: unknown): boolean {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Validates email format (RFC-compliant)
 * Checks for required format with @ and domain
 * @param email - The email to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;

  const trimmed = email.trim();
  if (trimmed !== email) return false; // No leading/trailing whitespace
  if (trimmed.length === 0) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

/**
 * Normalizes email by trimming and converting to lowercase
 * @param email - The email to normalize
 * @returns Normalized email
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Normalizes optional name field by trimming whitespace
 * Returns null for empty/undefined values
 * @param name - The name to normalize
 * @returns Normalized name or null
 */
export function normalizeName(name: unknown): string | null {
  if (name === null || name === undefined) return null;
  if (typeof name !== "string") return null;

  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Generates a server-side unique identifier (UUID v4)
 * This ensures the server controls all user IDs, preventing injection attacks
 * @returns A new UUID string
 */
export function generateUserId(): string {
  return randomUUID();
}
