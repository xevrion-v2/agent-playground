export function isIdeographicVariationIndicatorPresent(input: string): boolean {
  return input.includes("\u{303E}");
}
