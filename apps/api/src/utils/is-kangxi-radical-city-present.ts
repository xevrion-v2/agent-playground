const KANGXI_RADICAL_CITY = "\u{2FA2}";

export function isKangxiRadicalCityPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_CITY);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalCityPresent(input);
}

export default isKangxiRadicalCityPresent;
