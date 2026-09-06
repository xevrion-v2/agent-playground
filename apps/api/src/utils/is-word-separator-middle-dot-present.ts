const WORD_SEPARATOR_MIDDLE_DOT = "\u2e31";

export function isWordSeparatorMiddleDotPresent(input: string): boolean {
  return input.includes(WORD_SEPARATOR_MIDDLE_DOT);
}
