export function isHangulSingleDotToneMarkPresent(input: string): boolean {
  return input.includes("\u{302E}");
}
