export function isInterlinearAnnotationTerminatorPresent(value: string): boolean {
  return value.includes("\ufffb");
}
