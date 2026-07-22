/**
 * Checks whether the input string contains the Unicode character U+A0.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isNonBreakingSpacePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(160));
}
