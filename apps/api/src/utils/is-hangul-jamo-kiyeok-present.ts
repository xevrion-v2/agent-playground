export function isHangulJamoKiyeokPresent(input: string): boolean {
  return input.includes("\u{1100}");
}
