/**
 * Detects whether a string contains the Unicode CJK radical brush one character (U+2EBA).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical brush one character.
 */
export function isCjkRadicalBrushOnePresent(input: string): boolean {
  return input.includes("\u{2EBA}");
}
