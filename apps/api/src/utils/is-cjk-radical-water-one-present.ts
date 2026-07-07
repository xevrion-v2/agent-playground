/**
 * Detects whether a string contains the Unicode CJK radical water one character (U+2EA1).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical water one character.
 */
export function isCjkRadicalWaterOnePresent(input: string): boolean {
  return input.includes("\u{2EA1}");
}
