/**
 * Checks whether the input string contains the Unicode character U+2E02.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isLeftSubstitutionBracketPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11778));
}
