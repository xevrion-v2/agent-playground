/**
 * Detects whether a string contains the Kangxi Radical Fur character (U+2F53).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Fur character.
 */
export function isKangxiRadicalFurPresent(input: string): boolean {
  return input.includes('\u2F53');
}
