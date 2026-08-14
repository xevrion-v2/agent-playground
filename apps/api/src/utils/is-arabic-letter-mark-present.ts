const ARABIC_LETTER_MARK = "\u061c";

export function isArabicLetterMarkPresent(input: string): boolean {
  return input.includes(ARABIC_LETTER_MARK);
}
