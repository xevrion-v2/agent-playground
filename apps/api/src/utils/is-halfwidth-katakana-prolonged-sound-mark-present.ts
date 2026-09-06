export function isHalfwidthKatakanaProlongedSoundMarkPresent(input: string): boolean {
  return input.includes("\uff70");
}
