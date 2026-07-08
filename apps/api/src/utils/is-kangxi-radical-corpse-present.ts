const KANGXI_RADICAL_CORPSE = "\u2F2B";

export function isKangxiRadicalCorpsePresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_CORPSE);
}
