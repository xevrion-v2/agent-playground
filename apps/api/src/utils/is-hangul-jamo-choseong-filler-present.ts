export function isHangulJamoChoseongFillerPresent(input: string): boolean {
  return input.includes("\u{115F}");
}
