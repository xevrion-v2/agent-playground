const INVISIBLE_PLUS = "\u2064";

export function isInvisiblePlusPresent(input: string): boolean {
  return input.includes(INVISIBLE_PLUS);
}
