/**
 * Checks if the input string contains the Hangul choseong ceongchieumssangcieuc character (U+1151).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoCeongchieumssangcieucPresent(input: string): boolean {
  const targetChar = '\u1151';
  return input.includes(targetChar);
}
