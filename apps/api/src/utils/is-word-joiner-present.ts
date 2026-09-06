const WORD_JOINER = "\u2060";

export function isWordJoinerPresent(input: string): boolean {
  return input.includes(WORD_JOINER);
}
