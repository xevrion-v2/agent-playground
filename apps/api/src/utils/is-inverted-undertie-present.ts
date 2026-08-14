const INVERTED_UNDERTIE = "\u2054";

export function isInvertedUndertiePresent(input: string): boolean {
  return input.includes(INVERTED_UNDERTIE);
}
