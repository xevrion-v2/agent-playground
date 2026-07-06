const SQUARED_FOUR_DOT_PUNCTUATION = "\u2e2c";

export function isSquaredFourDotPunctuationPresent(input: string): boolean {
  return input.includes(SQUARED_FOUR_DOT_PUNCTUATION);
}
