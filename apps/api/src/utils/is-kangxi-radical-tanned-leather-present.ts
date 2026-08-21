const KANGXI_RADICAL_TANNED_LEATHER = "\u{2FB1}";

export function isKangxiRadicalTannedLeatherPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_TANNED_LEATHER);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalTannedLeatherPresent(input);
}

export default isKangxiRadicalTannedLeatherPresent;
