const KANGXI_RADICAL_BADGER = "\u{2F98}";

export function isKangxiRadicalBadgerPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_BADGER);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalBadgerPresent(input);
}

export default isKangxiRadicalBadgerPresent;
