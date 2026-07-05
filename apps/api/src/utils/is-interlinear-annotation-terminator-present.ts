const INTERLINEAR_ANNOTATION_TERMINATOR = "\ufffb";

export function isInterlinearAnnotationTerminatorPresent(input: string): boolean {
  return input.includes(INTERLINEAR_ANNOTATION_TERMINATOR);
}
