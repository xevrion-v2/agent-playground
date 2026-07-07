/**
 * Detects whether a string contains the Unicode CJK radical mesh character (U+2EB5).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical mesh character.
 */
export function isCjkRadicalMeshPresent(input: string): boolean {
  return input.includes("\u{2EB5}");
}
