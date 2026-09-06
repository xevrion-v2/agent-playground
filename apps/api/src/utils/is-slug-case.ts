/**
 * Type guard utility.
 */
export function isSlugCase(input: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(input);
}
