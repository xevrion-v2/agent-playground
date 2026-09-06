/**
 * Checks whether the input string contains the Unicode character U+AD.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isSoftHyphenPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(173));
}
