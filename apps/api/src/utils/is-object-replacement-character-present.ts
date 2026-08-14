/**
 * Checks whether the input string contains the Unicode character U+FFFC.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isObjectReplacementCharacterPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(65532));
}
