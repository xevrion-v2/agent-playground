const INTERLINEAR_ANNOTATION_SEPARATOR = "\ufffa";

export function isInterlinearAnnotationSeparatorPresent(input: string): boolean {
  return input.includes(INTERLINEAR_ANNOTATION_SEPARATOR);
}
