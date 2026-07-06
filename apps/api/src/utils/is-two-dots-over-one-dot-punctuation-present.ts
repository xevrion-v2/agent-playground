const TWO_DOTS_OVER_ONE_DOT_PUNCTUATION = "\u2e2a";

export function isTwoDotsOverOneDotPunctuationPresent(input: string): boolean {
  return input.includes(TWO_DOTS_OVER_ONE_DOT_PUNCTUATION);
}
