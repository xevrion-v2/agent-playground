export function isHangulJamoJongseongKiyeokHieuhPresent(input: string): boolean {
  return input.includes("\u{11FE}");
}
