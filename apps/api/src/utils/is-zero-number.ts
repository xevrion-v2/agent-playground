/**
 * Type guard utility.
 */
export function isZeroNumber(input: unknown): input is number {
  return typeof input === "number" && input === 0;
}
