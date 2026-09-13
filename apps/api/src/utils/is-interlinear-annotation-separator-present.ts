export function isInterlinearAnnotationSeparatorPresent(value: string): boolean {
  return /\uFFFA/.test(value);
}
