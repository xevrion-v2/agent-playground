/**
 * Checks whether the input string contains the null character (U+0000).
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isNullCharacterPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(0));
}
