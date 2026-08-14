/**
 * Detects whether a string contains the Unicode Kangxi radical bolt-of-cloth character (U+2F66 ⽦).
 * @param input - The string to check.
 * @returns `true` if the input contains the Kangxi radical bolt-of-cloth character, `false` otherwise.
 */
export function isKangxiRadicalBoltOfClothPresent(input: string): boolean {
  return input.includes('\u2F66');
}
