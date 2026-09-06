const FOUR_DOT_PUNCTUATION = "\u2058";

export function isFourDotPunctuationPresent(input: string): boolean {
  return input.includes(FOUR_DOT_PUNCTUATION);
}
