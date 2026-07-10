/**
 * Detects whether a string contains the Unicode Kangxi radical skin character (U+2F6A ⽪).
 * @param input - The string to check.
 * @returns `true` if the input contains the Kangxi radical skin character, `false` otherwise.
 */
export function isKangxiRadicalSkinPresent(input: string): boolean {
  return input.includes('\u2F6A');
}
