export function isHalfwidthKatakanaVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{FF9E}");
}
