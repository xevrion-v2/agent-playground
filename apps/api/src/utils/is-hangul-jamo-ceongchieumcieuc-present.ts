/**
 * Checks if the input string contains the Hangul choseong ceongchieumcieuc character (U+1150).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoCeongchieumcieucPresent(input: string): boolean {
  return input.includes('\u1150');
}
