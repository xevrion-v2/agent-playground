/**
 * Checks whether the input string contains the Unicode character U+B.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isVerticalTabSymbolPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11));
}
