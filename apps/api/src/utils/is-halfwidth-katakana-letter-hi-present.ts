const HALFWIDTH_KATAKANA_LETTER_HI = "\uFF8B";

export function isHalfwidthKatakanaLetterHiPresent(input: string): boolean {
  return input.includes(HALFWIDTH_KATAKANA_LETTER_HI);
}
