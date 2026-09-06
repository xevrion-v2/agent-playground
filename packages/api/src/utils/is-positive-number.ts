/**
 * Checks if a number is positive.
 * @param value - The value to check.
 * @returns True if the number is positive, false otherwise.
 */
export function isPositiveNumber(value: unknown): boolean {
  if (typeof value !== 'number' || !isFinite(value)) {
    return false;
  }

  return value > 0;
}