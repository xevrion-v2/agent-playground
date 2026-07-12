const CJK_RADICAL_SPIRIT_TWO = "\u2ead";

export function isCjkRadicalSpiritTwoPresent(input: string): boolean {
  return input.includes(CJK_RADICAL_SPIRIT_TWO);
}
