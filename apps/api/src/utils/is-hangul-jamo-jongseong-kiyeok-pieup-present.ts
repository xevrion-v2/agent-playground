export function isHangulJamoJongseongKiyeokPieupPresent(input: string): boolean {
  return input.includes("\u{11FB}");
}
