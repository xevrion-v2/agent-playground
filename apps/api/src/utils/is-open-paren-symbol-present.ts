/**
 * Checks whether the input string contains the Unicode character U+28.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isOpenParenSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(40));
}
