export function isHalfwidthKatakanaVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\uff9e");
}
