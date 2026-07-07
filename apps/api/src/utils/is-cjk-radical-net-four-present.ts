/**
 * Detects whether a string contains the Unicode CJK radical net four character (U+2EB4).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical net four character.
 */
export function isCjkRadicalNetFourPresent(input: string): boolean {
  return input.includes("\u{2EB4}");
}
