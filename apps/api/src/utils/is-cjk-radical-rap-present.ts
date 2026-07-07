/**
 * Detects whether a string contains the Unicode CJK radical rap character (U+2E99).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical rap character.
 */
export function isCjkRadicalRapPresent(input: string): boolean {
  return input.includes("\u{2E99}");
}
