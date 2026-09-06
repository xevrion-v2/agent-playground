export function isHiraganaVoicedIterationMarkPresent(input: string): boolean {
  return input.includes("\u{309E}");
}
