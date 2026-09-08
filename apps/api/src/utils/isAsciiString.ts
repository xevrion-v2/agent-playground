/**
 * Checks if every character in a string is an ASCII character (code < 128).
 * @param value - The string to check.
 * @returns true if all characters have code points below 128.
 */
export function isAsciiString(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) >= 128) {
      return false;
    }
  }
  return true;
}
