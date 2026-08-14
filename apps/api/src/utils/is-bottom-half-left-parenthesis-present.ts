/**
 * Checks whether the input string contains the Unicode character U+2E5B.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isBottomHalfLeftParenthesisPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11867));
}
