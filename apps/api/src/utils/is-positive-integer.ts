/**
 * Type guard utility.
 */
export function isPositiveInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isInteger(input) && input > 0;
}
