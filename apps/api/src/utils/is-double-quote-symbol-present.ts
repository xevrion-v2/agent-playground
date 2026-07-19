/**
 * Checks whether the input string contains the Unicode character U+22.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isDoubleQuoteSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(34));
}
