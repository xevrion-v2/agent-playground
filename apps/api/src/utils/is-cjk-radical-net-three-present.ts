/**
 * Detects whether a string contains the Unicode CJK radical net three character (U+2EB3).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical net three character.
 */
export function isCjkRadicalNetThreePresent(input: string): boolean {
  return input.includes("\u{2EB3}");
}
