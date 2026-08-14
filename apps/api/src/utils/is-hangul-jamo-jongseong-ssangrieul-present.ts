export function isHangulJamoJongseongSsangrieulPresent(input: string): boolean {
  return input.includes("\u{11D0}");
}
