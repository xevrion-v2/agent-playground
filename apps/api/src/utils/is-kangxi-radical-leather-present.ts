const KANGXI_RADICAL_LEATHER = "\u{2FB0}";

export function isKangxiRadicalLeatherPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_LEATHER);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalLeatherPresent(input);
}

export default isKangxiRadicalLeatherPresent;
