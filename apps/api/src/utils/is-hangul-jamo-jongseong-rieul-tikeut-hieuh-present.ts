export function isHangulJamoJongseongRieulTikeutHieuhPresent(input: string): boolean {
  return input.includes("\u{11CF}");
}
