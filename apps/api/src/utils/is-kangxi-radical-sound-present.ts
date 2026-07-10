const KANGXI_RADICAL_SOUND = "\u{2FB3}";

export function isKangxiRadicalSoundPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SOUND);
}

export function $fn(input: string): boolean {
  return isKangxiRadicalSoundPresent(input);
}

export default isKangxiRadicalSoundPresent;
