/**
 * Detects whether a string contains the hyphen with diaeresis character (U+2E1A).
 * @param input - The string to check
 * @returns true if the input contains the hyphen with diaeresis character
 */
export function isHyphenWithDiaeresisPresent(input: string): boolean {
  return input.includes('\u{2E1A}');
}
