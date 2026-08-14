/**
 * Detects whether a string contains the Unicode Kangxi radical field character (U+2F65 ⽥).
 * @param input - The string to check.
 * @returns `true` if the input contains the Kangxi radical field character, `false` otherwise.
 */
export function isKangxiRadicalFieldPresent(input: string): boolean {
  return input.includes('\u2F65');
}
