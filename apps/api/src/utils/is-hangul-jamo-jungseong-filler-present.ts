export function isHangulJamoJungseongFillerPresent(input: string): boolean {
  return input.includes("\u{1160}");
}
