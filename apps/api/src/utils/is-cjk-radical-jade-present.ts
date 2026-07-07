/**
 * Detects whether a string contains the Unicode CJK radical jade character (U+2EA9).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical jade character.
 */
export function isCjkRadicalJadePresent(input: string): boolean {
  return input.includes("\u{2EA9}");
}
