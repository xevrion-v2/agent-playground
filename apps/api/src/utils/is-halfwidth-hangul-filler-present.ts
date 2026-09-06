export function isHalfwidthHangulFillerPresent(value: string): boolean {
  return value.includes("\uffa0");
}
