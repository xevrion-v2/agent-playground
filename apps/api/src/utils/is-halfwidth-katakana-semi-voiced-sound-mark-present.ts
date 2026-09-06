export function isHalfwidthKatakanaSemiVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\uff9f");
}
