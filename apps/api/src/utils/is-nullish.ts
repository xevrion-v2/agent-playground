/**
 * Type guard utility.
 */
export function isNullish(input: unknown): input is null | undefined {
  return input === null || input === undefined;
}
