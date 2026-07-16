/**
 * Checks if every character in a string is printable ASCII (code 32–126).
 * @param value - The string to check.
 * @returns true if all characters have code points between 32 and 126 inclusive.
 */
export function isPrintableAscii(value: string): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code < 32 || code > 126) {
      return false;
    }
  }
  return true;
}
