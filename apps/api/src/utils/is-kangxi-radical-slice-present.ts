/**
 * Detects whether a string contains the Kangxi Radical Slice character (U+2F63).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Slice character.
 */
export function isKangxiRadicalSlicePresent(input: string): boolean {
  return input.includes('\u2F63');
}
