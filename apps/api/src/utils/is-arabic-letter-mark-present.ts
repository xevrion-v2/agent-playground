/**
 * Detects whether a string contains the Unicode Arabic Letter Mark character (U+061C).
 *
 * The Arabic Letter Mark (ALM) is a Unicode formatting character used to
 * control bidirectional text display in Arabic-script text. This utility
 * performs a quick check for its presence in any given string.
 *
 * @param input - The string to inspect.
 * @returns `true` if the input contains U+061C, `false` otherwise.
 */
export function isArabicLetterMarkPresent(input: string): boolean {
  // U+061C = 0x061C = 1564 in decimal
  return input.includes("\u061C");
}
