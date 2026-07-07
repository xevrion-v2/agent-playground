/**
 * Detects whether a string contains the Unicode CJK radical choke character (U+2E9B).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical choke character.
 */
export function isCjkRadicalChokePresent(input: string): boolean {
  return input.includes("\u{2E9B}");
}
