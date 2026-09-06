/**
 * Type guard utility.
 */
export function isNonNegativeNumber(input: unknown): input is number {
  return typeof input === "number" && input >= 0;
}
