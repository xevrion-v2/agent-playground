const RIGHT_LOW_PARAPHRASE_BRACKET = "\u2e1d";

export function isRightLowParaphraseBracketPresent(input: string): boolean {
  return input.includes(RIGHT_LOW_PARAPHRASE_BRACKET);
}
