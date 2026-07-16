/**
 * Detects whether a string contains the Kangxi Radical Claw character (U+2F5F).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Claw character.
 */
export function isKangxiRadicalClawPresent(input: string): boolean {
  return input.includes('\u2F5F');
}
