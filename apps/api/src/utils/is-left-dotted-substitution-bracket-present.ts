const LEFT_DOTTED_SUBSTITUTION_BRACKET = "\u2e04";

export function $fn(input: string): boolean {
  return input.includes(LEFT_DOTTED_SUBSTITUTION_BRACKET);
}
