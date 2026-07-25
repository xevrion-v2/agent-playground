export function isHangulJamoKhieukhPresent(input: string): boolean {
  return input.includes("\u{110F}");
}
