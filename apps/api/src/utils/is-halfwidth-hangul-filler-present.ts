export function isHalfwidthHangulFillerPresent(input: string): boolean {
  return input.includes("\uFFA0");
}
