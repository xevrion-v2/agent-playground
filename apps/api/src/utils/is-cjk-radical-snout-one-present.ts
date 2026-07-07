/**
 * Detects whether a string contains the Unicode CJK radical snout one character (U+2E94).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical snout one character.
 */
export function isCjkRadicalSnoutOnePresent(input: string): boolean {
  return input.includes("\u{2E94}");
}
