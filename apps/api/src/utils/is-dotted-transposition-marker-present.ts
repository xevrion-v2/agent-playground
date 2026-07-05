const DOTTED_TRANSPOSITION_MARKER = "\u2e08";

export function isDottedTranspositionMarkerPresent(input: string): boolean {
  return input.includes(DOTTED_TRANSPOSITION_MARKER);
}
