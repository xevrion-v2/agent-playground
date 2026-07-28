export function isHangulJamoJongseongSsangnieunPresent(input: string): boolean {
  return input.includes("\u11FF");
}
