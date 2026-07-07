const TILDE_WITH_RING_ABOVE = "\u2e1b";

export function isTildeWithRingAbovePresent(input: string): boolean {
  return input.includes(TILDE_WITH_RING_ABOVE);
}
