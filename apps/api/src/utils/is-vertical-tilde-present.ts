/**
 * Checks whether the input string contains the Unicode character U+2E2F.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isVerticalTildePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11823));
}
