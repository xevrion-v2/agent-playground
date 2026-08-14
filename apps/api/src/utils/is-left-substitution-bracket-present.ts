const LEFT_SUBSTITUTION_BRACKET = "\u2e02";

export function $fn(input: string): boolean {
  return input.includes(LEFT_SUBSTITUTION_BRACKET);
}
