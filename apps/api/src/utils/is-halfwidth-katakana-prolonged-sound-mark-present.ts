export function isHalfwidthKatakanaProlongedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{FF70}");
}
