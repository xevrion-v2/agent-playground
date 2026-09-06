/**
 * Type guard utility.
 */
export function isNegativeNumber(input: unknown): input is number {
  return typeof input === "number" && input < 0;
}
