/**
 * Detects whether a string contains the Unicode CJK radical eye character (U+2EAB).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical eye character.
 */
export function isCjkRadicalEyePresent(input: string): boolean {
  return input.includes("\u{2EAB}");
}
