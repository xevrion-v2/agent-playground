/**
 * Detects whether a string contains the Unicode Kangxi radical life character (U+2F63 ⽣).
 * @param input - The string to check.
 * @returns `true` if the input contains the Kangxi radical life character, `false` otherwise.
 */
export function isKangxiRadicalLifePresent(input: string): boolean {
  return input.includes('\u2F63');
}
