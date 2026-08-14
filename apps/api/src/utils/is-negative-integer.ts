/**
 * Type guard utility.
 */
export function isNegativeInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isInteger(input) && input < 0;
}
