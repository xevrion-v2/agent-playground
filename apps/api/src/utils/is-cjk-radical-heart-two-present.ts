/**
 * Detects whether a string contains the Unicode CJK radical heart two character (U+2E97).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical heart two character.
 */
export function isCjkRadicalHeartTwoPresent(input: string): boolean {
  return input.includes("\u{2E97}");
}
