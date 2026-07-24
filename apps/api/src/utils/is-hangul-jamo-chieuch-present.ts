export function isHangulJamoChieuchPresent(input: string): boolean {
  return input.includes("\u{110E}");
}
