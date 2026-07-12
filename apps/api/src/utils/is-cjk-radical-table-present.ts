const CJK_RADICAL_TABLE = "\u2e87";

export function isCjkRadicalTablePresent(input: string): boolean {
  return input.includes(CJK_RADICAL_TABLE);
}
