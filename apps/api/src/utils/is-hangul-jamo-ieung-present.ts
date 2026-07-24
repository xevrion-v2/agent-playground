export function isHangulJamoIeungPresent(input: string): boolean {
  return input.includes("\u{110B}");
}
