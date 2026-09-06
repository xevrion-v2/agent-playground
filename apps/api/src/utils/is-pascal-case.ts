/**
 * Type guard utility.
 */
export function isPascalCase(input: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(input);
}
