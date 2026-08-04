const HIRAGANA_LETTER_HU = "\u3075";

export function isHiraganaLetterHuPresent(input: string): boolean {
  return input.includes(HIRAGANA_LETTER_HU);
}
