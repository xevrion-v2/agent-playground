const KANGXI_RADICAL_BODY = "\u{2F9D}";

export function isKangxiRadicalBodyPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_BODY);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalBodyPresent(input);
}

export default isKangxiRadicalBodyPresent;
