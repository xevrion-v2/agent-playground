const NATIONAL_DIGIT_SHAPES = "\u206e";

export function isNationalDigitShapesPresent(input: string): boolean {
  return input.includes(NATIONAL_DIGIT_SHAPES);
}
