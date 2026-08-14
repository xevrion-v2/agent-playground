const FIVE_DOT_PUNCTUATION = "\u2059";

export function isFiveDotPunctuationPresent(input: string): boolean {
  return input.includes(FIVE_DOT_PUNCTUATION);
}
