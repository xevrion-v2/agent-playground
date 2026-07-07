/**
 * Detects whether a string contains the Unicode CJK radical paw two character (U+2EA5).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical paw two character.
 */
export function isCjkRadicalPawTwoPresent(input: string): boolean {
  return input.includes("\u{2EA5}");
}
