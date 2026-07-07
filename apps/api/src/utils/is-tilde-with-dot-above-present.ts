/**
 * Detects whether a string contains the tilde with dot above character (U+2E1E).
 * @param input - The string to check
 * @returns true if the input contains the tilde with dot above character
 */
export function isTildeWithDotAbovePresent(input: string): boolean {
  return input.includes('\u{2E1E}');
}
