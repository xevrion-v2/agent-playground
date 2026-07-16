const KANGXI_RADICAL_LEEK = "\u{2FB2}";

export function isKangxiRadicalLeekPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_LEEK);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalLeekPresent(input);
}

export default isKangxiRadicalLeekPresent;
