const LEFT_TRANSPOSITION_BRACKET = "\u2e09";

export function isLeftTranspositionBracketPresent(input: string): boolean {
  return input.includes(LEFT_TRANSPOSITION_BRACKET);
}
