const HALFWIDTH_KATAKANA_LETTER_HU = "\uFF8C";

export function isHalfwidthKatakanaLetterHuPresent(input: string): boolean {
  return input.includes(HALFWIDTH_KATAKANA_LETTER_HU);
}
