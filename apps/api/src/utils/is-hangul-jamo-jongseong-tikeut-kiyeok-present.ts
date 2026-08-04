export function isHangulJamoJongseongTikeutKiyeokPresent(input: string): boolean {
  return input.includes("\u{11CA}");
}
