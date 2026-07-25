export function isHalfwidthKatakanaSemiVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{FF9F}");
}
