/**
 * Checks whether the input string contains the Unicode character U+A.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isNewlineSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(10));
}
