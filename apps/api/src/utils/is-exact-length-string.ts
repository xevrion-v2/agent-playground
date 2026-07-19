/**
 * Type guard utility.
 */
export function isExactLengthString(input: unknown, length: number): input is string {
  return typeof input === "string" && input.length === length;
}
