/**
 * Checks if a value is a valid date.
 * @param value - The value to check.
 * @returns True if the value is a valid date, false otherwise.
 */
export function isValidDate(value: unknown): boolean {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  return false;
}