/**
 * Removes a suffix from a string if present.
 *
 * @example
 * stripStringSuffix("hello.txt", ".txt") // => "hello"
 * stripStringSuffix("hello.txt", ".csv") // => "hello.txt"
 */
export function stripStringSuffix(str: string, suffix: string): string {
  if (suffix.length > 0 && str.endsWith(suffix)) {
    return str.slice(0, str.length - suffix.length);
  }
  return str;
}
