export function isPostalMarkFacePresent(input: string): boolean {
  return input.includes("\u{3020}");
}
