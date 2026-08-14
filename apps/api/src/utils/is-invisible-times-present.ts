const INVISIBLE_TIMES = "\u2062";

export function isInvisibleTimesPresent(input: string): boolean {
  return input.includes(INVISIBLE_TIMES);
}
