export function isVerticalKanaRepeatWithVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{3032}");
}
