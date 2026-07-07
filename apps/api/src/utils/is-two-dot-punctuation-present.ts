const TWO_DOT_PUNCTUATION = "\u205a";

export function isTwoDotPunctuationPresent(input: string): boolean {
  return input.includes(TWO_DOT_PUNCTUATION);
}
