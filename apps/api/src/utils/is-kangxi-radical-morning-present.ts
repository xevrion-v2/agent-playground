const KANGXI_RADICAL_MORNING = "\u{2FA0}";

export function isKangxiRadicalMorningPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_MORNING);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalMorningPresent(input);
}

export default isKangxiRadicalMorningPresent;
