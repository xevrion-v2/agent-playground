/**
 * Type guard utility.
 */
export function isInteger(input: unknown): input is number {
  return typeof input === "number" && Number.isInteger(input);
}
