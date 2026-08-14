export function isHangulJamoSsangkiyeokPresent(input: string): boolean {
  return input.includes("\u{1101}");
}
