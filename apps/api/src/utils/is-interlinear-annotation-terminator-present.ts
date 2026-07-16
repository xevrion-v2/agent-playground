export function isInterlinearAnnotationTerminatorPresent(input: string): boolean {
  return input.includes("\u{FFFB}");
}
