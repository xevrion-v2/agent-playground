/**
 * Safely parses a string into an integer.
 * @param str - The string to parse.
 * @returns Integer value, or undefined if input is not a valid integer.
 *
 * @example
 * `	s
 * parseIntSafe('42'); // => 42
 * parseIntSafe('-7'); // => -7
 * parseIntSafe('abc'); // => undefined
 * `
 */
export function parseIntSafe(str: string): number | undefined {
  const n = parseInt(str, 10);
  return Number.isInteger(n) ? n : undefined;
}
