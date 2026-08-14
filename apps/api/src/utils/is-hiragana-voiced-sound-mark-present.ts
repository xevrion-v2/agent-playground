export function isHiraganaVoicedSoundMarkPresent(input: string): boolean {
  return input.includes("\u{309B}");
}
