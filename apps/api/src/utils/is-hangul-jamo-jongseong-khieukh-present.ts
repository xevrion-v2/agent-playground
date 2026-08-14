export function isHangulJamoJongseongKhieukhPresent(input: string): boolean {
  return input.includes("\u{11BF}");
}
