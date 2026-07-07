/**
 * Detects whether a string contains the Unicode CJK radical heart one character (U+2E96).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical heart one character.
 */
export function isCjkRadicalHeartOnePresent(input: string): boolean {
  return input.includes("\u{2E96}");
}
