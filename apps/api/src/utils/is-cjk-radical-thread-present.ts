/**
 * Detects whether a string contains the Unicode CJK radical thread character (U+2E93).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical thread character.
 */
export function isCjkRadicalThreadPresent(input: string): boolean {
  return input.includes("\u{2E93}");
}
