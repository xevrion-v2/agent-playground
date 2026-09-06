/**
 * Checks whether the input string contains the Unicode character U+302B.
 * @param input - The string to check.
 * @returns true if the input contains the character, false otherwise.
 */
export function isIdeographicRisingToneMarkPresent(input: string): boolean {
  return input.includes(String.fromCodePoint(12331));
}
