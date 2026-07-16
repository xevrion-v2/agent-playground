export function isHiraganaDigraphYoriPresent(input: string): boolean {
  return input.includes("\u{309F}");
}
