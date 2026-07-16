export function isVerticalKanaRepeatWithVoicedSoundMarkUpperHalfPresent(input: string): boolean {
  return input.includes("\u{3034}");
}
