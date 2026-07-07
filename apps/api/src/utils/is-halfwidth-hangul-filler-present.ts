const HALFWIDTH_HANGUL_FILLER = "\uffa0";

export function isHalfwidthHangulFillerPresent(input: string): boolean {
  return input.includes(HALFWIDTH_HANGUL_FILLER);
}
