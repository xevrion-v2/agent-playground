/**
 * Type guard that narrows an unknown value to a plain object record.
 * Returns true only for values whose internal [[Class]] is "Object",
 * i.e. objects created via `{}` or `new Object()`.
 * Arrays, class instances, null, and primitives all return false.
 */
export function isPlainRecord(
  value: unknown
): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}
