export function isHiraganaCombiningSemiVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{309A}");
}
