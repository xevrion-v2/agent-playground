export function isHangulJamoJongseongKiyeokPresent(input: string): boolean {
  return input.includes("\u{11A8}");
}
