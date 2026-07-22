/**
 * Type guard utility.
 */
export function isMinLengthString(input: unknown, min: number): input is string {
  return typeof input === "string" && input.length >= min;
}
