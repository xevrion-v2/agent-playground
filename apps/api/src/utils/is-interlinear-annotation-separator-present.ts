export function isInterlinearAnnotationSeparatorPresent(input: string): boolean {
  return input.includes("\uFFFA");
}
