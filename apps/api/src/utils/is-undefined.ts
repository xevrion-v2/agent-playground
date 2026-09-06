/**
 * Type guard utility.
 */
export function isUndefined(input: unknown): input is undefined {
  return input === undefined;
}
