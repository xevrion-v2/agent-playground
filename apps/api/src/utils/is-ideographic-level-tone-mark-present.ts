export function isIdeographicLevelToneMarkPresent(input: string): boolean {
  return input.includes("\u{302A}");
}
