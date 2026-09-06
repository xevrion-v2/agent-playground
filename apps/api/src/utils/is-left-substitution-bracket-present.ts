const LEFT_SUBSTITUTION_BRACKET = "\u2e02";

export function isLeftSubstitutionBracketPresent(input: string): boolean {
  return input.includes(LEFT_SUBSTITUTION_BRACKET);
}
