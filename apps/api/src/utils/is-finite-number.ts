/**
 * Type guard utility.
 */
export function isFiniteNumber(input: unknown): input is number {
  return typeof input === "number" && Number.isFinite(input);
}
