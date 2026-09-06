/**
 * Detects whether a string contains the Kangxi Radical Melon character (U+2F58).
 * @param input - The string to check.
 * @returns true if the input contains the Kangxi Radical Melon character.
 */
export function isKangxiRadicalMelonPresent(input: string): boolean {
  return input.includes('\u2F58');
}
