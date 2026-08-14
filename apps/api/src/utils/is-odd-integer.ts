/**
 * Type guard utility.
 */
export function isOddInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isInteger(input) && input % 2 !== 0;
}
