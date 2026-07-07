/**
 * Detects whether a string contains the Unicode CJK radical death character (U+2E9E).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical death character.
 */
export function isCjkRadicalDeathPresent(input: string): boolean {
  return input.includes("\u{2E9E}");
}
