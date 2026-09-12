/**
 * Validation utility functions for API input validation.
 * Provides common validation helpers for request payloads.
 */

/**
 * Validation result interface.
 */
export interface ValidationResult {
  /** Whether the validation passed */
  valid: boolean;
  /** Validation errors (empty if valid) */
  errors: string[];
}

/**
 * Creates a successful validation result.
 */
export function valid(): ValidationResult {
  return { valid: true, errors: [] };
}

/**
 * Creates a failed validation result with errors.
 */
export function invalid(errors: string | string[]): ValidationResult {
  return {
    valid: false,
    errors: Array.isArray(errors) ? errors : [errors],
  };
}

/**
 * Checks if a value is a valid email address.
 *
 * @param value - The value to check
 * @returns True if the value is a valid email, false otherwise
 *
 * @example
 * ```ts
 * isEmail("user@example.com") // true
 * isEmail("invalid-email") // false
 * isEmail(null) // false
 * ```
 */
export function isEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Checks if a value is a valid URL.
 *
 * @param value - The value to check
 * @returns True if the value is a valid URL, false otherwise
 *
 * @example
 * ```ts
 * isUrl("https://example.com") // true
 * isUrl("not-a-url") // false
 * ```
 */
export function isUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a value is a valid phone number (basic format).
 *
 * @param value - The value to check
 * @returns True if the value is a valid phone number, false otherwise
 *
 * @example
 * ```ts
 * isPhoneNumber("+1234567890") // true
 * isPhoneNumber("123-456-7890") // true
 * isPhoneNumber("invalid") // false
 * ```
 */
export function isPhoneNumber(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^[+]?[\d\s\-().]{7,20}$/.test(value);
}

/**
 * Checks if a value is a valid IPv4 address.
 *
 * @param value - The value to check
 * @returns True if the value is a valid IPv4 address, false otherwise
 *
 * @example
 * ```ts
 * isIPv4("192.168.1.1") // true
 * isIPv4("256.1.1.1") // false
 * isIPv4("invalid") // false
 * ```
 */
export function isIPv4(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const parts = value.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && String(num) === part;
  });
}

/**
 * Checks if a value is a valid IPv6 address.
 *
 * @param value - The value to check
 * @returns True if the value is a valid IPv6 address, false otherwise
 *
 * @example
 * ```ts
 * isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334") // true
 * isIPv6("::1") // true
 * isIPv6("invalid") // false
 * ```
 */
export function isIPv6(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const groups = value.split(":");
  if (groups.length < 2 || groups.length > 8) return false;
  return groups.every((group) => {
    if (group === "") return true; // Allow empty groups for :: notation
    return /^[0-9a-fA-F]{1,4}$/.test(group);
  });
}

/**
 * Checks if a value is a valid IP address (IPv4 or IPv6).
 *
 * @param value - The value to check
 * @returns True if the value is a valid IP address, false otherwise
 */
export function isIP(value: unknown): value is string {
  return isIPv4(value) || isIPv6(value);
}

/**
 * Checks if a value is a valid UUID (v4).
 *
 * @param value - The value to check
 * @returns True if the value is a valid UUID, false otherwise
 *
 * @example
 * ```ts
 * isUUID("550e8400-e29b-41d4-a716-446655440000") // true
 * isUUID("not-a-uuid") // false
 * ```
 */
export function isUUID(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
}

/**
 * Checks if a value is a valid hex color.
 *
 * @param value - The value to check
 * @returns True if the value is a valid hex color, false otherwise
 *
 * @example
 * ```ts
 * isHexColor("#fff") // true
 * isHexColor("#ffffff") // true
 * isHexColor("ffffff") // false (no #)
 * ```
 */
export function isHexColor(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

/**
 * Checks if a value is a valid date string.
 *
 * @param value - The value to check
 * @returns True if the value is a valid date, false otherwise
 *
 * @example
 * ```ts
 * isDate("2026-09-12") // true
 * isDate("invalid-date") // false
 * isDate(new Date()) // true
 * ```
 */
export function isDate(value: unknown): value is Date | string {
  if (value instanceof Date) return !isNaN(value.getTime());
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Checks if a value is a valid JSON string.
 *
 * @param value - The value to check
 * @returns True if the value is valid JSON, false otherwise
 *
 * @example
 * ```ts
 * isJSON('{"key": "value"}') // true
 * isJSON("invalid json") // false
 * ```
 */
export function isJSON(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid JSON object (not array or primitive).
 *
 * @param value - The value to check
 * @returns True if the value is a valid JSON object, false otherwise
 */
export function isJSONObject(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const parsed = JSON.parse(value);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

/**
 * Checks if a value is a valid integer.
 *
 * @param value - The value to check
 * @returns True if the value is a valid integer, false otherwise
 *
 * @example
 * ```ts
 * isInteger(42) // true
 * isInteger(3.14) // false
 * isInteger("42") // false (string)
 * ```
 */
export function isInteger(value: unknown): value is number {
  if (typeof value !== "number") return false;
  return Number.isInteger(value);
}

/**
 * Checks if a value is a valid positive integer.
 *
 * @param value - The value to check
 * @returns True if the value is a valid positive integer, false otherwise
 */
export function isPositiveInteger(value: unknown): value is number {
  return isInteger(value) && value > 0;
}

/**
 * Checks if a value is a valid negative integer.
 *
 * @param value - The value to check
 * @returns True if the value is a valid negative integer, false otherwise
 */
export function isNegativeInteger(value: unknown): value is number {
  return isInteger(value) && value < 0;
}

/**
 * Checks if a value is a valid number (not NaN or Infinity).
 *
 * @param value - The value to check
 * @returns True if the value is a valid number, false otherwise
 *
 * @example
 * ```ts
 * isNumber(42) // true
 * isNumber(NaN) // false
 * isNumber(Infinity) // false
 * isNumber("42") // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  if (typeof value !== "number") return false;
  return !isNaN(value) && isFinite(value);
}

/**
 * Checks if a value is a valid boolean.
 *
 * @param value - The value to check
 * @returns True if the value is a boolean, false otherwise
 *
 * @example
 * ```ts
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean("true") // false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks if a value is a valid array.
 *
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a valid object (not null, not array).
 *
 * @param value - The value to check
 * @returns True if the value is an object, false otherwise
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Checks if a value is a valid function.
 *
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

/**
 * Checks if a value is null or undefined.
 *
 * @param value - The value to check
 * @returns True if the value is null or undefined, false otherwise
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if a value is not null or undefined.
 *
 * @param value - The value to check
 * @returns True if the value is not null or undefined, false otherwise
 */
export function isNotNil(value: unknown): boolean {
  return !isNil(value);
}

/**
 * Checks if a string is empty (after optional trim).
 *
 * @param value - The value to check
 * @param trim - Whether to trim before checking (default: true)
 * @returns True if the string is empty, false otherwise
 */
export function isEmptyString(value: unknown, trim = true): value is string {
  if (typeof value !== "string") return false;
  return trim ? value.trim() === "" : value === "";
}

/**
 * Checks if a string is not empty (after optional trim).
 *
 * @param value - The value to check
 * @param trim - Whether to trim before checking (default: true)
 * @returns True if the string is not empty, false otherwise
 */
export function isNotEmptyString(value: unknown, trim = true): value is string {
  return typeof value === "string" && (trim ? value.trim() !== "" : value !== "");
}

/**
 * Checks if an array is empty.
 *
 * @param value - The value to check
 * @returns True if the array is empty, false otherwise
 */
export function isEmptyArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length === 0;
}

/**
 * Checks if an array is not empty.
 *
 * @param value - The value to check
 * @returns True if the array is not empty, false otherwise
 */
export function isNotEmptyArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Checks if an object is empty (has no own enumerable properties).
 *
 * @param value - The value to check
 * @returns True if the object is empty, false otherwise
 */
export function isEmptyObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.keys(value).length === 0;
}

/**
 * Checks if an object is not empty.
 *
 * @param value - The value to check
 * @returns True if the object is not empty, false otherwise
 */
export function isNotEmptyObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.keys(value).length > 0;
}

/**
 * Validates that a string has a minimum length.
 *
 * @param value - The value to check
 * @param min - The minimum length
 * @returns True if the string has at least min characters, false otherwise
 */
export function minLength(value: unknown, min: number): value is string {
  if (typeof value !== "string") return false;
  return value.length >= min;
}

/**
 * Validates that a string has a maximum length.
 *
 * @param value - The value to check
 * @param max - The maximum length
 * @returns True if the string has at most max characters, false otherwise
 */
export function maxLength(value: unknown, max: number): value is string {
  if (typeof value !== "string") return false;
  return value.length <= max;
}

/**
 * Validates that a string length is within a range.
 *
 * @param value - The value to check
 * @param min - The minimum length
 * @param max - The maximum length
 * @returns True if the string length is within the range, false otherwise
 */
export function lengthBetween(value: unknown, min: number, max: number): value is string {
  if (typeof value !== "string") return false;
  return value.length >= min && value.length <= max;
}

/**
 * Validates that a number is within a range.
 *
 * @param value - The value to check
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns True if the number is within the range, false otherwise
 */
export function inRange(value: unknown, min: number, max: number): value is number {
  if (typeof value !== "number" || isNaN(value)) return false;
  return value >= min && value <= max;
}

/**
 * Validates that a value matches a regex pattern.
 *
 * @param value - The value to check
 * @param pattern - The regex pattern
 * @returns True if the value matches the pattern, false otherwise
 */
export function matches(value: unknown, pattern: RegExp): value is string {
  if (typeof value !== "string") return false;
  return pattern.test(value);
}

/**
 * Validates that a value is one of the allowed values.
 *
 * @param value - The value to check
 * @param allowed - The allowed values
 * @returns True if the value is allowed, false otherwise
 */
export function isOneOf<T>(value: unknown, allowed: T[]): value is T {
  return Array.isArray(allowed) && allowed.includes(value as T);
}

/**
 * Validates that a value is not one of the disallowed values.
 *
 * @param value - The value to check
 * @param disallowed - The disallowed values
 * @returns True if the value is not disallowed, false otherwise
 */
export function isNotOneOf<T>(value: unknown, disallowed: T[]): boolean {
  return !Array.isArray(disallowed) || !disallowed.includes(value as T);
}

/**
 * Validates a required field (not null, undefined, or empty string).
 *
 * @param value - The value to check
 * @returns True if the value is present, false otherwise
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
}

export default {
  valid,
  invalid,
  isEmail,
  isUrl,
  isPhoneNumber,
  isIPv4,
  isIPv6,
  isIP,
  isUUID,
  isHexColor,
  isDate,
  isJSON,
  isJSONObject,
  isInteger,
  isPositiveInteger,
  isNegativeInteger,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isNil,
  isNotNil,
  isEmptyString,
  isNotEmptyString,
  isEmptyArray,
  isNotEmptyArray,
  isEmptyObject,
  isNotEmptyObject,
  minLength,
  maxLength,
  lengthBetween,
  inRange,
  matches,
  isOneOf,
  isNotOneOf,
  isRequired,
};
