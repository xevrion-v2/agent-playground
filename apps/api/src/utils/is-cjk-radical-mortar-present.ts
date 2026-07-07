/**
 * Detects whether a string contains the Unicode CJK radical mortar character (U+2EBD).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical mortar character.
 */
export function isCjkRadicalMortarPresent(input: string): boolean {
  return input.includes("\u{2EBD}");
}
