/**
 * Type guard utility.
 */
export function isSafeOddInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isSafeInteger(input) && input % 2 !== 0;
}
