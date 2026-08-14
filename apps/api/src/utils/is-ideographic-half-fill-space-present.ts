export function isIdeographicHalfFillSpacePresent(input: string): boolean {
  return input.includes("\u{303F}");
}
