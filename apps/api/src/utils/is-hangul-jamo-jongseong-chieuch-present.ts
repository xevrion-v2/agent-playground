export function isHangulJamoJongseongChieuchPresent(input: string): boolean {
  return input.includes("\u{11BE}");
}
