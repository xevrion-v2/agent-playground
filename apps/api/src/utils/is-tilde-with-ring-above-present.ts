/**
 * Detects whether a string contains the tilde with ring above character (U+2E1B).
 * @param input - The string to check
 * @returns true if the input contains the tilde with ring above character
 */
export function isTildeWithRingAbovePresent(input: string): boolean {
  return input.includes('\u{2E1B}');
}
