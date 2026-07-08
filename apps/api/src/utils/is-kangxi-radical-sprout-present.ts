const KANGXI_RADICAL_SPROUT = "\u2F2C";

export function isKangxiRadicalSproutPresent(input: string): boolean {
  return input.includes(KANGXI_RADICAL_SPROUT);
}
