/**
 * Checks whether the input string contains the Unicode character U+2044.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isFractionSlashPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8260));
}
