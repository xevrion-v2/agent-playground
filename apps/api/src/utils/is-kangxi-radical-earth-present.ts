const KANGXI_RADICAL_EARTH = "\u2F1F";

export function isKangxiRadicalEarthPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_EARTH);
}
