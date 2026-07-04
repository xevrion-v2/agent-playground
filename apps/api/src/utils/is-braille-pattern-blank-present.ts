const BRAILLE_PATTERN_BLANK = "\u2800";

export function isBraillePatternBlankPresent(input: string): boolean {
  return input.includes(BRAILLE_PATTERN_BLANK);
}
