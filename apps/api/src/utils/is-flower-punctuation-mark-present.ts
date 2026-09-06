const FLOWER_PUNCTUATION_MARK = "\u2055";

export function $fn(input: string): boolean {
  return input.includes(FLOWER_PUNCTUATION_MARK);
}
