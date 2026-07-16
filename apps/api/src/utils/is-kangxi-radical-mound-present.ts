const KANGXI_RADICAL_MOUND = "\u{2FA9}";

export function isKangxiRadicalMoundPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_MOUND);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalMoundPresent(input);
}

export default isKangxiRadicalMoundPresent;
