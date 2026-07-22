/**
 * Checks whether the input string contains the Unicode character U+2F50.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isKangxiRadicalComparePresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12112));
}
