/**
 * Type guard utility.
 */
export function isEvenInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isInteger(input) && input % 2 === 0;
}
