const EN_SPACE = "\u2002";

export function isEnSpacePresent(value: string): boolean {
  return value.includes(EN_SPACE);
}
