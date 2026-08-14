/**
 * Checks whether the input string contains the Unicode character U+2FFC.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isIdeographicDescriptionCharacterSurroundFromRightPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12284));
}
