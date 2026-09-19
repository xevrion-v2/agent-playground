/**
 * Type guard that narrows an `unknown` value to a plain object record.
 *
 * Returns `true` only for values whose prototype is `Object.prototype` or
 * `null` (e.g. object literals and `Object.create(null)`). Arrays, class
 * instances, functions, dates, and primitives return `false`.
 *
 * Useful for safely validating untrusted JSON payloads before reading
 * properties off them.
 *
 * @example
 * declare const body: unknown;
 * if (isPlainRecord(body) && typeof body.email === "string") {
 *   // body is Record<string, unknown> here
 * }
 *
 * @param value - The value to check.
 * @returns `true` when `value` is a plain object record.
 */
export function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const proto = Object.getPrototypeOf(value) as unknown;
  return proto === Object.prototype || proto === null;
}
