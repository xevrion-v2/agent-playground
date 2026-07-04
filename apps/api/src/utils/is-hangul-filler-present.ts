const HANGUL_FILLER = "\u3164";

export function isHangulFillerPresent(input: string): boolean {
  return input.includes(HANGUL_FILLER);
}
