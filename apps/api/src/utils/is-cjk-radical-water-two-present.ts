/**
 * Detects whether a string contains the Unicode CJK radical water two character (U+2EA2).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical water two character.
 */
export function isCjkRadicalWaterTwoPresent(input: string): boolean {
  return input.includes("\u{2EA2}");
}
