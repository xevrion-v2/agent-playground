const VERTICAL_TILDE = "\u2e2f";

export function isVerticalTildePresent(input: string): boolean {
  return input.includes(VERTICAL_TILDE);
}
