/**
 * Detects whether a string contains the Unicode CJK radical sun character (U+2E9C).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical sun character.
 */
export function isCjkRadicalSunPresent(input: string): boolean {
  return input.includes("\u{2E9C}");
}
