/**
 * Detects whether a string contains the right low paraphrase bracket character (U+2E1D).
 * @param input - The string to check
 * @returns true if the input contains the right low paraphrase bracket character
 */
export function isRightLowParaphraseBracketPresent(input: string): boolean {
  return input.includes('\u{2E1D}');
}
