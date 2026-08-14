export function isIdeographicRisingToneMarkPresent(input: string): boolean {
  return input.includes("\u{302B}");
}
