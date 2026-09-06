const CJK_RADICAL_KNIFE_ONE = "\u2e88";

export function isCjkRadicalKnifeOnePresent(input: string): boolean {
  return input.includes(CJK_RADICAL_KNIFE_ONE);
}
