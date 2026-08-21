const KANGXI_RADICAL_PIG = "\u{2F97}";

export function isKangxiRadicalPigPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_PIG);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalPigPresent(input);
}

export default isKangxiRadicalPigPresent;
