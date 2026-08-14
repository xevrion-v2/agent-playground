const REVERSED_PILCROW_SIGN = "\u204b";

export function isReversedPilcrowSignPresent(input: string): boolean {
  return input.includes(REVERSED_PILCROW_SIGN);
}
