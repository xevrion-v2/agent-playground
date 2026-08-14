const MATH_SHIFT = "\u205a";

export function isMathShiftPresent(input: string): boolean {
  return input.includes(MATH_SHIFT);
}
