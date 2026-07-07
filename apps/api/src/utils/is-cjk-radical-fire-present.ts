/**
 * Detects whether a string contains the Unicode CJK radical fire character (U+2EA3).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical fire character.
 */
export function isCjkRadicalFirePresent(input: string): boolean {
  return input.includes("\u{2EA3}");
}
