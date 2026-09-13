const KANGXI_RADICAL_FACE = "\u{2FAF}";

export function isKangxiRadicalFacePresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_FACE);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalFacePresent(input);
}

export default isKangxiRadicalFacePresent;
