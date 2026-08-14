/**
 * Type guard utility.
 */
export function isNonPositiveNumber(input: unknown): input is number {
  return typeof input === "number" && input <= 0;
}
