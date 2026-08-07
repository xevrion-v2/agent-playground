export function isHangulJamoJongseongRieulTikeutPresent(input: string): boolean {
  return input.includes("\u{11CE}");
}
