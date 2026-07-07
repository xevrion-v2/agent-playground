/**
 * Detects whether a string contains the Unicode CJK radical brush two character (U+2EBB).
 * @param input - The string to check.
 * @returns `true` if the input contains the CJK radical brush two character.
 */
export function isCjkRadicalBrushTwoPresent(input: string): boolean {
  return input.includes("\u{2EBB}");
}
