export function isIdeographicEnteringToneMarkPresent(input: string): boolean {
  return input.includes("\u{302D}");
}
