export function isHangulJamoJongseongSsangieungPresent(input: string): boolean {
  return input.includes("\u{11EE}");
}
