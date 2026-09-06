const PUNCTUATION_SPACE = "\u2008";

export function isPunctuationSpacePresent(value: string): boolean {
  return value.includes(PUNCTUATION_SPACE);
}
