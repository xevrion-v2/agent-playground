/**
 * Type guard utility.
 */
export function isEmptyString(input: unknown): input is "" {
  return typeof input === "string" && input === "";
}
