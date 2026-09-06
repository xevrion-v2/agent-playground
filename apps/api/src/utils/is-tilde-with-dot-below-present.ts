const TILDE_WITH_DOT_BELOW = "\u2e1f";

export function isTildeWithDotBelowPresent(input: string): boolean {
  return input.includes(TILDE_WITH_DOT_BELOW);
}
