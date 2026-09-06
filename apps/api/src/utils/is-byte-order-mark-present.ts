/**
 * Checks whether the input string contains the Unicode character U+FEFF.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isByteOrderMarkPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(65279));
}
