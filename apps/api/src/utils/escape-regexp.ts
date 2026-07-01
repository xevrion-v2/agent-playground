/**
 * Escapes special regex characters in a string for safe use in RegExp construction.
 * @param str - The string to escape.
 * @returns A string with regex metacharacters escaped with backslashes.
 *
 * @example
 * ```ts
 * escapeRegExp('foo.bar'); // => 'foo\.bar'
 * escapeRegExp('$100 [test]'); // => '\$100 \[test\]'
 * ```
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
