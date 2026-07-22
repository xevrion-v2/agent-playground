/**
 * Type guard utility.
 */
export function isSnakeCase(input: string): boolean {
  return /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/.test(input);
}
