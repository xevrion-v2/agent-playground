const INTERLINEAR_ANNOTATION_ANCHOR = "\ufff9";

export function isInterlinearAnnotationAnchorPresent(input: string): boolean {
  return input.includes(INTERLINEAR_ANNOTATION_ANCHOR);
}
