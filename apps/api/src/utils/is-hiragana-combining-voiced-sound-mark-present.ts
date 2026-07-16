export function isHiraganaCombiningVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{3099}");
}
