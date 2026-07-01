/**
 * Compares two strings case-insensitively.
 *
 * @example
 * stringEqualsIgnoreCase("Hello", "hello") // => true
 * stringEqualsIgnoreCase("WORLD", "world") // => true
 * stringEqualsIgnoreCase("abc", "def")     // => false
 */
export function stringEqualsIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}
