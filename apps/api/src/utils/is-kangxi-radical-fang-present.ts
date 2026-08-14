/**
 * Detects whether a string contains the Kangxi Radical Fang character (U+2F50).
 * @param input - The string to check.
 * @returns true if the input contains the kangxi radical fang character.
 */
export function isKangxiRadicalFangPresent(input: string): boolean {
  return input.includes('\u2F50');
}
