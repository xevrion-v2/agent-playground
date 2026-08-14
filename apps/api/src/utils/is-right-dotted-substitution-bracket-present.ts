/**
 * Checks whether the input string contains the Unicode character U+2E05.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isRightDottedSubstitutionBracketPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11781));
}
