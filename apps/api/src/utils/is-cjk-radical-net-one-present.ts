/**
 * Detects whether a string contains the Unicode CJK radical net one character (U+2EB1).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical net one character.
 */
export function isCjkRadicalNetOnePresent(input: string): boolean {
  return input.includes("\u{2EB1}");
}
