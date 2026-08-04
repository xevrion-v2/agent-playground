export function isHangulJamoJongseongRieulKiyeokPresent(input: string): boolean {
  return input.includes("\u{11B0}");
}
