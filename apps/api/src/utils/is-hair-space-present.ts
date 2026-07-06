const HAIR_SPACE = "\u200a";

export function isHairSpacePresent(value: string): boolean {
  return value.includes(HAIR_SPACE);
}
