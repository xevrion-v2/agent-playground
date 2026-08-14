export function isInterlinearAnnotationSeparatorPresent(value: string): boolean {
  return value.includes("\ufffa");
}
