/**
 * Type guard utility.
 */
export function isNonZeroNumber(input: unknown): input is number {
  return typeof input === "number" && input !== 0;
}
