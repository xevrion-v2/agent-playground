/**
 * Type guard utility.
 */
export function isSafeNonPositiveInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isSafeInteger(input) && input <= 0;
}
