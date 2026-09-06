/**
 * Checks whether the input string contains the Unicode character U+2E1A.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isHyphenWithDiaeresisPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11802));
}
