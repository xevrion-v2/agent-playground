const LEFT_LOW_PARAPHRASE_BRACKET = "\u2e1c";

export function isLeftLowParaphraseBracketPresent(input: string): boolean {
  return input.includes(LEFT_LOW_PARAPHRASE_BRACKET);
}
