/**
 * Checks whether the input string contains the Unicode character U+26.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isAmpersandSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(38));
}
