const KANGXI_RADICAL_FOOT = "\u{2F9C}";

export function isKangxiRadicalFootPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_FOOT);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalFootPresent(input);
}

export default isKangxiRadicalFootPresent;
