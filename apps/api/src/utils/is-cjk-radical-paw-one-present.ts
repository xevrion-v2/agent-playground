/**
 * Detects whether a string contains the Unicode CJK radical paw one character (U+2EA4).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical paw one character.
 */
export function isCjkRadicalPawOnePresent(input: string): boolean {
  return input.includes("\u{2EA4}");
}
