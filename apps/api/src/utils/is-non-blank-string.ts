/**
 * Type guard utility.
 */
export function isNonBlankString(input: unknown): input is string {
  return typeof input === "string" && input.trim() !== "";
}
