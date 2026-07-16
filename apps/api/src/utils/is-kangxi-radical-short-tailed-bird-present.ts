const KANGXI_RADICAL_SHORT_TAILED_BIRD = "\u{2FAB}";

export function isKangxiRadicalShortTailedBirdPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SHORT_TAILED_BIRD);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalShortTailedBirdPresent(input);
}

export default isKangxiRadicalShortTailedBirdPresent;
