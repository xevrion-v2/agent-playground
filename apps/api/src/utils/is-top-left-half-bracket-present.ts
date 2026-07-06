const TOP_LEFT_HALF_BRACKET = "\u2e22";

export function isTopLeftHalfBracketPresent(input: string): boolean {
  return input.includes(TOP_LEFT_HALF_BRACKET);
}
