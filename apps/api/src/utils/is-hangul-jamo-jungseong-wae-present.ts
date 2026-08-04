export function isHangulJamoJungseongWaePresent(input: string): boolean {
  return input.includes("\u{116B}");
}
