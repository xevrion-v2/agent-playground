export function isIdeographicDepartingToneMarkPresent(input: string): boolean {
  return input.includes("\u{302C}");
}
