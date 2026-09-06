/**
 * Type guard utility.
 */
export function isNull(input: unknown): input is null {
  return input === null;
}
