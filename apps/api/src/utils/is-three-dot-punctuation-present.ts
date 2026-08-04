const THREE_DOT_PUNCTUATION = "\u2056";

export function isThreeDotPunctuationPresent(input: string): boolean {
  return input.includes(THREE_DOT_PUNCTUATION);
}
