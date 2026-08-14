export function isHalfwidthHangulFillerPresent(input: string): boolean {
  return input.includes("\u{FFA0}");
}
