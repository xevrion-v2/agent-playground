/**
 * Checks whether the input string contains the Unicode character U+2066.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isLeftToRightIsolatePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8294));
}
