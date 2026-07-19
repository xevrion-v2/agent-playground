/**
 * Checks whether the input string contains the Unicode character U+25.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isPercentSignSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(37));
}
