/**
 * Detects whether a string contains the Unicode CJK radical old character (U+2EB9).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical old character.
 */
export function isCjkRadicalOldPresent(input: string): boolean {
  return input.includes("\u{2EB9}");
}
