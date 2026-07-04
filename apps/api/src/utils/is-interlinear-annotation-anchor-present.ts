export function isInterlinearAnnotationAnchorPresent(value: string): boolean {
  return /\uFFF9/.test(value);
}
