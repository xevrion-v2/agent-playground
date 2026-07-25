export function isHangulJamoRieulPresent(input: string): boolean {
  return input.includes("\u{1105}");
}
