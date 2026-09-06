export function isHangulFillerPresent(input: string): boolean {
  return input.includes("\u{3164}");
}
