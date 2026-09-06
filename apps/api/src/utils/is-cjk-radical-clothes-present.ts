/**
 * Checks whether the input string contains the Unicode character U+2EC2.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isCjkRadicalClothesPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(11970));
}
