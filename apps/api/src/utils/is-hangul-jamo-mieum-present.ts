export function isHangulJamoMieumPresent(input: string): boolean {
  return input.includes("\u{1106}");
}
