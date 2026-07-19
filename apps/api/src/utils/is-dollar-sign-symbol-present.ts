/**
 * Checks whether the input string contains the Unicode character U+24.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isDollarSignSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(36));
}
