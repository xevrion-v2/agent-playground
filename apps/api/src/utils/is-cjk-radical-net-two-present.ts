/**
 * Detects whether a string contains the Unicode CJK radical net two character (U+2EB2).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical net two character.
 */
export function isCjkRadicalNetTwoPresent(input: string): boolean {
  return input.includes("\u{2EB2}");
}
