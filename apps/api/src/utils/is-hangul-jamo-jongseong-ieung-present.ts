export function isHangulJamoJongseongIeungPresent(input: string): boolean {
  return input.includes("\u{11BC}");
}
