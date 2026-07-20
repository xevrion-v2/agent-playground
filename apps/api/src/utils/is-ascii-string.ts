/**
 * Checks whether a string contains only ASCII characters (code points 0-127).
 * Useful for validating strings that will be used in ASCII-only contexts.
 *
 * @param value - The string to test.
 * @returns `true` if the string contains only ASCII characters, `false` otherwise.
 */
export function isAsciiString(value: string): boolean {
  return /^[\x00-\x7F]*$/.test(value);
}
