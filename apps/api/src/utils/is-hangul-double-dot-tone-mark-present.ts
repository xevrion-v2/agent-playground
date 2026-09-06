export function isHangulDoubleDotToneMarkPresent(input: string): boolean {
  return input.includes("\u{302F}");
}
