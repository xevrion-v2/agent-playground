const CJK_RADICAL_PERSON = "\u2e85";

export function isCjkRadicalPersonPresent(input: string): boolean {
  return input.includes(CJK_RADICAL_PERSON);
}
