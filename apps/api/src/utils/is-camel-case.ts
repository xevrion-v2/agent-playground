/**
 * Type guard utility.
 */
export function isCamelCase(input: string): boolean {
  return /^[a-z][a-zA-Z0-9]*$/.test(input);
}
