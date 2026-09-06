export function isHangulJamoPhieuphPresent(input: string): boolean {
  return input.includes("\u{1111}");
}
