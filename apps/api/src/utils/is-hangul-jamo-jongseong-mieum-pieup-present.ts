export function isHangulJamoJongseongMieumPieupPresent(input: string): boolean {
  return input.includes("\u{11DC}");
}
