const CJK_RADICAL_BOX = "\u2e86";

export function isCjkRadicalBoxPresent(input: string): boolean {
  return input.includes(CJK_RADICAL_BOX);
}
