/**
 * Checks whether the input string contains the Unicode character U+2055.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isFlowerPunctuationMarkPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(8277));
}
