/**
 * Guards a numeric value to ensure it is positive.
 * @param value - The number to guard.
 * @param min - Minimum allowed value (default 1).
 * @returns The value if positive, otherwise undefined.
 *
 * @example
 * `	s
 * guardPositive(5); // => 5
 * guardPositive(-3); // => undefined
 * guardPositive(0); // => undefined
 * `
 */
export function guardPositive(value: number, min: number = 1): number | undefined {
  return value >= min ? value : undefined;
}
