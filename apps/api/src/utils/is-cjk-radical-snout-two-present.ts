/**
 * Detects whether a string contains the Unicode CJK radical snout two character (U+2E95).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical snout two character.
 */
export function isCjkRadicalSnoutTwoPresent(input: string): boolean {
  return input.includes("\u{2E95}");
}
