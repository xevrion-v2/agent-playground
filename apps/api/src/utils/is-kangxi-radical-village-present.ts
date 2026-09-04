const KANGXI_RADICAL_VILLAGE = "\u{2FA5}";

export function isKangxiRadicalVillagePresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_VILLAGE);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalVillagePresent(input);
}

export default isKangxiRadicalVillagePresent;
