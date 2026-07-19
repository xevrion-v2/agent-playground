/**
 * Checks whether the input string contains the Unicode character U+2067.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isRightToLeftIsolatePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8295));
}
