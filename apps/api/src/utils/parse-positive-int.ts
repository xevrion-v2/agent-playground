/**
 * Parses a positive integer from a string or number.
 * @module utils/parse-positive-int
 */
export function parsePositiveInt(value: unknown): number | null {
  const n = parseInt(String(value), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}
