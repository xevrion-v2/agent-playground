const CJK_RADICAL_KNIFE_TWO = "\u2e89";

export function isCjkRadicalKnifeTwoPresent(input: string): boolean {
  return input.includes(CJK_RADICAL_KNIFE_TWO);
}
