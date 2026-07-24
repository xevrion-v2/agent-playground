/**
 * Checks if the input string contains the Hangul choseong chieuch-khieukh character (U+1152).
 * @param input - The string to check.
 * @returns true if the character is present, false otherwise.
 */
export function isHangulJamoChieuchKhieukhPresent(input: string): boolean {
  const targetChar = '\u1152';
  return input.includes(targetChar);
}
