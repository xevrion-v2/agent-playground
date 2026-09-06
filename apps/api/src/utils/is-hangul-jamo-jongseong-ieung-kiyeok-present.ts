export function isHangulJamoJongseongIeungKiyeokPresent(input: string): boolean {
  return input.includes("\u{11EC}");
}
