/**
 * Checks whether the input string contains the Unicode character U+2ECA.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalFootPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11978));
}
