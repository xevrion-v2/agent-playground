/**
 * Detects whether a string contains the Unicode CJK radical moon character (U+2E9D).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical moon character.
 */
export function isCjkRadicalMoonPresent(input: string): boolean {
  return input.includes("\u{2E9D}");
}
