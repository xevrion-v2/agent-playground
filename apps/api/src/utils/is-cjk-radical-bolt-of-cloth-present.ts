/**
 * Detects whether a string contains the Unicode CJK radical bolt of cloth character (U+2EAA).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical bolt of cloth character.
 */
export function isCjkRadicalBoltOfClothPresent(input: string): boolean {
  return input.includes("\u{2EAA}");
}
