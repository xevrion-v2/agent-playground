/**
 * Checks whether the input string contains the Unicode character U+3E.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isGreaterThanSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(62));
}
