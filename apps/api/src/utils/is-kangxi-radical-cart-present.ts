const KANGXI_RADICAL_CART = "\u{2F9E}";

export function isKangxiRadicalCartPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_CART);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalCartPresent(input);
}

export default isKangxiRadicalCartPresent;
