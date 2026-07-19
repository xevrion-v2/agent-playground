/**
 * Type guard utility.
 */
export function isBlankString(input: unknown): input is string {
  return typeof input === "string" && input.trim() === "";
}
