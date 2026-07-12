export function isInterlinearAnnotationAnchorPresent(input: string): boolean {
  return input.includes("\uFFF9");
}
