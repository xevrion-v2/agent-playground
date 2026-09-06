/**
 * Type guard utility.
 */
export function isKebabCase(input: string): boolean {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(input);
}
