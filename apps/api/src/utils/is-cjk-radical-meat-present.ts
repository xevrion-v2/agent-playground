/**
 * Detects whether a string contains the Unicode CJK radical meat character (U+2EBC).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical meat character.
 */
export function isCjkRadicalMeatPresent(input: string): boolean {
  return input.includes("\u{2EBC}");
}
