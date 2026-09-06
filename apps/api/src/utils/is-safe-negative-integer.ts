/**
 * Type guard utility.
 */
export function isSafeNegativeInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isSafeInteger(input) && input < 0;
}
