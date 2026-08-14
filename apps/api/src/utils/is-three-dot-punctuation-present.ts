const THREE_DOT_PUNCTUATION = "\u2056";

export function $fn(input: string): boolean {
  return input.includes(THREE_DOT_PUNCTUATION);
}
