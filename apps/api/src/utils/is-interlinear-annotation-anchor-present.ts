export function isInterlinearAnnotationAnchorPresent(input: string): boolean {
  return input.includes("\u{FFF9}");
}
