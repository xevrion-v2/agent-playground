const TURNED_COMMA = "\u2e32";

export function isTurnedCommaPresent(input: string): boolean {
  return input.includes(TURNED_COMMA);
}
