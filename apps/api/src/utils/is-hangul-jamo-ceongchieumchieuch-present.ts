/**
 * Checks if the input string contains the Hangul choseong ceongchieumchieuch character (U+1155).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoCeongchieumchieuchPresent(input: string): boolean {
  const targetChar = '\u1155';
  return input.includes(targetChar);
}
