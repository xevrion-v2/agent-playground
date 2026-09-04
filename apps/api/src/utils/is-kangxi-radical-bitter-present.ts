const KANGXI_RADICAL_BITTER = "\u{2F9F}";

export function isKangxiRadicalBitterPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_BITTER);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalBitterPresent(input);
}

export default isKangxiRadicalBitterPresent;
