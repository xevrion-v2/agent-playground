/**
 * Detects whether a string contains the Unicode Kangxi radical white character (U+2F69 ⽩).
 * @param input - The string to check.
 * @returns `true` if the input contains the Kangxi radical white character, `false` otherwise.
 */
export function isKangxiRadicalWhitePresent(input: string): boolean {
  return input.includes('\u2F69');
}
