const RIGHT_DOTTED_SUBSTITUTION_BRACKET = "\u2e05";

export function isRightDottedSubstitutionBracketPresent(input: string): boolean {
  return input.includes(RIGHT_DOTTED_SUBSTITUTION_BRACKET);
}
