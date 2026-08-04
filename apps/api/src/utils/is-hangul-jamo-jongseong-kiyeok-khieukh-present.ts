export function isHangulJamoJongseongKiyeokKhieukhPresent(input: string): boolean {
  return input.includes("\u{11FD}");
}
