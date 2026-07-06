const THIN_SPACE = "\u2009";

export function isThinSpacePresent(value: string): boolean {
  return value.includes(THIN_SPACE);
}
