const RIGHT_SUBSTITUTION_BRACKET = "\u2e03";

export function isRightSubstitutionBracketPresent(input: string): boolean {
  return input.includes(RIGHT_SUBSTITUTION_BRACKET);
}
