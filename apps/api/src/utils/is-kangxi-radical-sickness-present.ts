/**
 * Detects whether a string contains the Unicode Kangxi radical sickness character (U+2F67 ⽧).
 * @param input - The string to check.
 * @returns `true` if the input contains the Kangxi radical sickness character, `false` otherwise.
 */
export function isKangxiRadicalSicknessPresent(input: string): boolean {
  return input.includes('\u2F67');
}
