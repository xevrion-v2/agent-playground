/**
 * Detects whether a string contains the Unicode CJK radical spirit one character (U+2EAC).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical spirit one character.
 */
export function isCjkRadicalSpiritOnePresent(input: string): boolean {
  return input.includes("\u{2EAC}");
}
