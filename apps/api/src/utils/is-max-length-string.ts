/**
 * Type guard utility.
 */
export function isMaxLengthString(input: unknown, max: number): input is string {
  return typeof input === "string" && input.length <= max;
}
