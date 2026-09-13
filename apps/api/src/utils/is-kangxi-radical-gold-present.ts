const KANGXI_RADICAL_GOLD = "\u{2FA6}";

export function isKangxiRadicalGoldPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_GOLD);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalGoldPresent(input);
}

export default isKangxiRadicalGoldPresent;
