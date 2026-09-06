/**
 * Checks whether the input string contains the Unicode character U+2FFA.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isIdeographicDescriptionCharacterSurroundFromLowerLeftPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12282));
}
