/**
 * Detects whether a string contains the Kangxi Radical Tile character (U+2F57).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Tile character.
 */
export function isKangxiRadicalTilePresent(input: string): boolean {
  return input.includes('\u2F57');
}
