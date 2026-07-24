/**
 * Checks if the input string contains the Hangul choseong chitueumchieuch character (U+1154).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoChitueumchieuchPresent(input: string): boolean {
  return input.includes('\u1154');
}
