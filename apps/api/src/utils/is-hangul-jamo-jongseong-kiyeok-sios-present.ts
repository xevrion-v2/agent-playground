export function isHangulJamoJongseongKiyeokSiosPresent(input: string): boolean {
  return input.includes("\u{11AA}");
}
