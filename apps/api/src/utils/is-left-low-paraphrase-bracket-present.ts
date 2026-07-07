/**
 * Detects whether a string contains the left low paraphrase bracket character (U+2E1C).
 * @param input - The string to check
 * @returns true if the input contains the left low paraphrase bracket character
 */
export function isLeftLowParaphraseBracketPresent(input: string): boolean {
  return input.includes('\u{2E1C}');
}
