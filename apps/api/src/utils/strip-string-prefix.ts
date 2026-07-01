/**
 * Removes a prefix from a string if present.
 *
 * @example
 * stripStringPrefix("https://example.com", "https://") // => "example.com"
 * stripStringPrefix("hello", "world") // => "hello"
 */
export function stripStringPrefix(str: string, prefix: string): string {
  if (prefix.length > 0 && str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
}
