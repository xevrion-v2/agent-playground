const TILDE_WITH_DOT_ABOVE = "\u2e1e";

export function isTildeWithDotAbovePresent(input: string): boolean {
  return input.includes(TILDE_WITH_DOT_ABOVE);
}
