/**
 * Checks whether the input string contains the Unicode character U+3018.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isLeftWhiteTortoiseShellBracketPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12312));
}
