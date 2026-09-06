const COMBINING_GRAPHEME_JOINER = "\u034f";

export function isCombiningGraphemeJoinerPresent(input: string): boolean {
  return input.includes(COMBINING_GRAPHEME_JOINER);
}
