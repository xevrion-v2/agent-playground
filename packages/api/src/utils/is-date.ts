/**
 * Checks if a value is a valid date.
 * @param value - The value to check.
 * @returns True if the value is a valid date, false otherwise.
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}