export function isHangulJamoSsangsiosPresent(input: string): boolean {
  return input.includes("\u{110A}");
}
